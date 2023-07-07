from django.http import JsonResponse

from rest_framework.decorators import api_view

from openrouteservice import client
from shapely.geometry import Polygon, mapping, MultiPolygon, LineString, Point
from pyproj import Transformer

# separate file with api keys
from . import info

from .models import Locations
from datetime import datetime
import pickle
import pandas as pd
import numpy as np
import time


# Expects POST operation from react front end, request contains the coordinates of the start and destination
# will be expanded to include date and time
@api_view(['POST'])
def directions_view(request):
    start = time.time()

    def create_buffer_polygon(transformer_wgs84_to_utm32n, transformer_utm32n_to_wgs84, point_in, resolution=2,
                              radius=20):
        point_in_proj = transformer_wgs84_to_utm32n.transform(*point_in)
        point_buffer_proj = Point(point_in_proj).buffer(radius, resolution=resolution)  # 20 m buffer

        # Transform back to WGS84
        poly_wgs = [transformer_utm32n_to_wgs84.transform(*point) for point in point_buffer_proj.exterior.coords]
        return poly_wgs

    # sends route request to api with start and destination coordinates and polygons to avoid
    def create_route(data, avoided_point_list, n=0):
        route_request = {'coordinates': data,
                         'format': 'geojson',
                         'profile': 'foot-walking',
                         'preference': 'shortest',
                         'instructions': False,
                         'options': {'avoid_polygons': mapping(MultiPolygon(avoided_point_list))}}
        route_directions = ors.directions(**route_request)
        return route_directions

    # create a buffer around the route itself, so it is not repeated
    def create_buffer(route_directions):
        line_tup = []
        for line in route_directions['features'][0]['geometry']['coordinates']:
            tup_format = tuple(line)
            line_tup.append(tup_format)

        new_linestring = LineString(line_tup)
        dilated_route = new_linestring.buffer(0.001)
        return dilated_route

    api_key = info.ors_key
    ors = client.Client(key=api_key)

    # splits the string and reformat it into the structure needed for the api
    str_coordinates = request.data["locations"]
    ls_coordinates = str_coordinates.split(",")
    coordinates = [[ls_coordinates[0], ls_coordinates[1]], [ls_coordinates[2], ls_coordinates[3]]]

    high_index_value_ls = []
    point_geometry = []
    transformer_wgs84_to_utm32n = Transformer.from_crs("EPSG:4326", "EPSG:3857")
    transformer_utm32n_to_wgs84 = Transformer.from_crs("EPSG:3857", "EPSG:4326")

    all_locations = predicted_locations()

    for location in all_locations:
        position = [location['long'], location['lat']]
        point_buffer = create_buffer_polygon(transformer_wgs84_to_utm32n, transformer_utm32n_to_wgs84, position)
        high_index_value_ls.append(point_buffer)
        point_geometry.append(Polygon(point_buffer))

    avoided_point_list = []
    # Create regular route with still empty avoided_point_list
    optimal_directions = create_route(coordinates, avoided_point_list)

    # Create buffer around route
    avoidance_directions = create_buffer(optimal_directions)

    avoidance_route = ""
    attempts = 0

    try:
        for site_poly in high_index_value_ls:
            poly = Polygon(site_poly)
            if poly.within(avoidance_directions):
                if attempts < 5:
                    avoided_point_list.append(poly)
                    avoidance_route = create_route(coordinates, avoided_point_list, 1)
                    avoidance_directions = create_buffer(avoidance_route)
                    attempts += 1
                    print('Generated alternative route, which avoids affected areas.')

                else:
                    return JsonResponse({
                        'optimal_directions': optimal_directions,
                        'avoidance_directions': avoidance_route
                    })

    except Exception as e:
        avoidance_route = ""
        print(e)

    end = time.time()
    print("Elapsed time: " + str(end - start))

    # return json back to react front end
    return JsonResponse({
        'optimal_directions': optimal_directions,
        'avoidance_directions': avoidance_route
    })


# on load of home page, a GET request returns all the coordinates in the database for the noise data
# for heatmap generation and the associated noise/busyness index value respectively
@api_view(['GET'])
def locations_view(request):
    # gets the current time by hour
    now = datetime.now()
    now_hour = int(now.strftime("%H"))

    # gets the current day of the week and assigning binary value for weekend/weekday
    day_of_week = now.weekday()
    if 0 <= day_of_week <= 4:
        weekday_value = 1
        weekend_value = 0
    else:
        weekday_value = 0
        weekend_value = 1

    # filters through all the locations to match the current time and date
    locations = Locations.objects.filter(hour=now_hour, weekday=weekday_value, weekend=weekend_value)

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        response_dict = {
            'long': location.long,
            'lat': location.lat,
            'count': location.count
        }
        response_list.append(response_dict)

    # creates a JSON object and sends it to the frontend
    return JsonResponse(response_list, safe=False)


# temporarily uses current time and date, will change this to take in the parameters passed from the front end
# such as date and time which will be used as inputs into the model
def predicted_locations():
    # gets the current time by hour
    now = datetime.now()
    now_hour = int(now.strftime("%H"))

    # gets the current day of the week and assigning binary value for weekend/weekday
    day_of_week = now.weekday()
    if 0 <= day_of_week <= 4:
        weekday_value = 1
        weekend_value = 0
    else:
        weekday_value = 0
        weekend_value = 1

    # filters through all the locations to match the current time and date
    locations = Locations.objects.filter(hour=now_hour, weekday=weekday_value, weekend=weekend_value)

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        if location.count >= 4:
            response_dict = {
                'long': location.long,
                'lat': location.lat,
                'count': location.count
            }
            response_list.append(response_dict)

    return response_list
