from django.http import JsonResponse

from rest_framework.decorators import api_view

from openrouteservice import client
from shapely.geometry import Polygon, mapping, MultiPolygon, LineString, Point
from shapely.ops import cascaded_union
import pyproj

# separate file with api keys
from . import info

from .models import Locations
from .serializers import LocationsSerializer
import sklearn
from datetime import datetime
import pickle
import pandas as pd
import numpy as np
import time

# Expects POST operation from react front end
@api_view(['POST'])
def directions_view(request):
    # Creates a polygon around the inputted point, used to find if a route passes through a point
    def create_buffer_polygon(point_in, resolution=2, radius=20):
        sr_wgs = pyproj.Proj(init='epsg:4326')  # WGS84, coordinate type
        sr_utm = pyproj.Proj(init='epsg:32632')  # UTM32N, coordinate type
        point_in_proj = pyproj.transform(sr_wgs, sr_utm, *point_in)  # Unpack list to arguments
        point_buffer_proj = Point(point_in_proj).buffer(radius, resolution=resolution)  # 20 m buffer

        # Iterate over all points in buffer and build polygon
        poly_wgs = []
        for point in point_buffer_proj.exterior.coords:
            poly_wgs.append(pyproj.transform(sr_utm, sr_wgs, *point))  # Transform back to WGS84
        return poly_wgs

    # Loads in the api key
    api_key = info.ors_key
    # Sends request to open route service
    ors = client.Client(key=api_key)
    # Start and Destination of route from POST
    coordinates = request.data

    # Points that have a high index value
    high_index_value_ls = []
    # List of polygons for each point
    point_geometry = []
    all_coordinate_data = []

    data1 = {
        'properties': {
            'HOCHWASSER': 1
        },
        'geometry': {
            'coordinates': [
                11.635208,
                52.136096
            ]
        }
    }

    all_coordinate_data.append(data1)

    for data in all_coordinate_data:
        # Tweets which are not affected by the flood
        if data['properties']['HOCHWASSER'] == 1:
            # Create buffer polygons around affected sites with 20 m radius and low resolution
            point_buffer = create_buffer_polygon(data['geometry']['coordinates'],
                                                 resolution=2,  # low resolution to keep polygons lean
                                                 radius=20)
            high_index_value_ls.append(point_buffer)

            # Create simplify geometry and merge overlapping buffer regions
            point_poly = Polygon(point_buffer)
            point_geometry.append(point_poly)
    union_poly = mapping(cascaded_union(point_geometry))

    # sends route request to api with start and destination coordinates and polygons to avoid
    def create_route(data, avoided_point_list, n=0):
        route_request = {'coordinates': data,
                         'format_out': 'geojson',
                         'profile': 'driving-car',
                         'preference': 'shortest',
                         'instructions': False,
                         'options': {'avoid_polygons': mapping(MultiPolygon(avoided_point_list))}}
        route_directions = ors.directions(**route_request)
        return route_directions

    # create a buffer around the route itself so it is not repeated
    def create_buffer(route_directions):
        line_tup = []
        for line in route_directions['features'][0]['geometry']['coordinates']:
            tup_format = tuple(line)
            line_tup.append(tup_format)

        new_linestring = LineString(line_tup)
        dilated_route = new_linestring.buffer(0.001)
        return dilated_route

    # Create empty list with avoided points
    avoided_point_list = []
    # Create regular route with still empty avoided_point_list
    optimal_directions = create_route(coordinates, avoided_point_list)

    # Create buffer around route
    avoidance_directions = create_buffer(optimal_directions)

    try:
        for site_poly in high_index_value_ls:
            poly = Polygon(site_poly)
            if poly.within(avoidance_directions):
                avoided_point_list.append(poly)

                # Create new route and buffer
                avoidance_route = create_route(coordinates, avoided_point_list, 1)
                avoidance_directions = create_buffer(avoidance_route)

        print('Generated alternative route, which avoids affected areas.')
    except Exception:
        print(
            'Sorry, there is no route available between the requested destination because of too many blocked streets.')

    # return json back to react front end
    return JsonResponse({
        'optimal_directions': optimal_directions,
        'avoidance_directions': avoidance_route
    })


# on load of home page, a GET request returns all the coordinates in the database for the noise data
# and the associated noise/busyness index value respectively

@api_view(['GET'])
def locations_view(request):
    start = time.time()
    # gets the value of all objects in the database
    location_data = Locations.objects.all().values()

    # Pickle file input: ['Longitude', 'Latitude', 'Hour', 'Weekday', 'Weekend']
    # Example: [-73.94508762577884, 40.81010795620323, 0, 1, 0]
    x_vars = []

    # current date and time
    now = datetime.now()
    now_hour = now.strftime("%H")

    # append current time
    x_vars.append(int(now_hour))

    # get the day of the week and assign binary value for weekend/weekday
    dt = now.strftime("%Y-%m-%d")
    date_format = "%Y-%m-%d"
    now_date_dt = now.strptime(dt, date_format)
    day_of_week = now_date_dt.weekday()

    # Monday - 0, Sunday - 6
    if 0 <= day_of_week <= 4:
        x_vars.extend([1, 0])
    else:
        x_vars.extend([0, 1])

    serialized_data = []
    # a queryset is returned, this has to be serialized to a dictionary to then be converted to JSON
    for location in location_data:
        serializer = LocationsSerializer(location)
        serialized_data.append(serializer.data)

    # for each value of lat and lng, a random value is generated and added to the dictionary as 'count', this will be
    # the noise/busyness index value but is currently a random value

    with open("./quietquestapp/test_noise_model.pkl", "rb") as file:
        noise_model = pickle.load(file)

    response_data = []
    for data in serialized_data:
        coordinates = list(data.values())
        coordinates.extend(x_vars)
        coordinates_reshaped = np.array(coordinates).reshape(1, -1)
        x = pd.DataFrame(coordinates_reshaped, columns=['Longitude', 'Latitude', 'Hour', 'Weekday', 'Weekend'])
        prediction = noise_model.predict(x)
        pred_float = prediction.item()
        data["count"] = int(round(pred_float))
        response_data.append(data)
        print(data)

    end = time.time()
    print("Time elapsed: " + str(end - start))
    return JsonResponse(response_data, safe=False)
