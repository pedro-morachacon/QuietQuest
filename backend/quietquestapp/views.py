from django.http import JsonResponse

from rest_framework.decorators import api_view

from openrouteservice import client
from shapely.geometry import Polygon, mapping, MultiPolygon, Point
from pyproj import Transformer

# separate file with api keys
from . import info

from .models import NoiseLocations, TaxiWeekdayLocations, TaxiWeekendLocations, Accounts, NoisePolygons, \
    TaxiWeekdayPolygons, TaxiWeekendPolygons, Ratings
from datetime import datetime
import pandas as pd
import time
from itertools import chain
import json
from django.core import serializers
from shapely import affinity


# Expects POST operation from react front end, request contains the coordinates of the start and destination
# will be expanded to include date and time
@api_view(['POST'])
def directions_view(request):
    start = time.time()

    # sends route request to api with start and destination coordinates and polygons to avoid
    def create_route(data, avoided_polygons, n=0):
        route_request = {'coordinates': data,
                         'format': 'geojson',
                         'profile': 'foot-walking',
                         'preference': 'shortest',
                         'instructions': True,
                         'options': {'avoid_polygons': mapping(MultiPolygon(avoided_polygons))}}
        route_directions = ors.directions(**route_request)
        return route_directions

    def create_buffer_polygon(point_in, resolution=10, radius=100):
        transformer_wgs84_to_utm32n = Transformer.from_crs("EPSG:4326", "EPSG:3857")
        transformer_utm32n_to_wgs84 = Transformer.from_crs("EPSG:3857", "EPSG:4326")
        point_in_proj = transformer_wgs84_to_utm32n.transform(*point_in)
        point_buffer_proj = Point(point_in_proj).buffer(radius, resolution=resolution)

        # Adjust the aspect ratio of the buffer
        transformed_buffer = affinity.scale(point_buffer_proj, xfact=1, yfact=5)

        # Transform back to WGS84
        poly_wgs = [transformer_utm32n_to_wgs84.transform(*point) for point in transformed_buffer.exterior.coords]
        return poly_wgs

    api_key = info.ors_key
    ors = client.Client(key=api_key)

    # splits the string and reformat it into the structure needed for the api
    str_coordinates = request.data["locations"]
    ls_coordinates = str_coordinates.split(",")
    coordinates = [[ls_coordinates[0], ls_coordinates[1]], [ls_coordinates[2], ls_coordinates[3]]]

    # initialises time and day as current time and day
    now = datetime.now()
    prediction_hour = int(now.strftime("%H"))
    prediction_day = now.weekday()

    # when the values are empty, the datepicker frontend has not been changed, meaning it is the current time
    if request.data["time"] != "" and request.data["date"] != "":
        prediction_hour = request.data["time"][0:2]
        prediction_day = pd.Timestamp(request.data["date"]).day_of_week

    active_tab = request.data["tab"]

    if 0 <= prediction_day <= 4:
        if active_tab == "noise":
            all_objects = list(NoisePolygons.objects.filter(hour=prediction_hour, weekday=1, weekend=0))
        elif active_tab == "crowds":
            all_objects = list(TaxiWeekdayPolygons.objects.filter(hour=prediction_hour, day=prediction_day))
        else:
            all_objects = list(
                chain(NoisePolygons.objects.filter(hour=prediction_hour, weekday=1, weekend=0),
                      TaxiWeekdayPolygons.objects.filter(hour=prediction_hour, day=prediction_day)))
    else:
        if active_tab == "noise":
            all_objects = list(NoisePolygons.objects.filter(hour=prediction_hour, weekday=0, weekend=1))
        elif active_tab == "crowds":
            all_objects = list(TaxiWeekendPolygons.objects.filter(hour=prediction_hour, day=prediction_day))
        else:
            all_objects = list(chain(NoisePolygons.objects.filter(hour=prediction_hour, weekday=0, weekend=1),
                                     TaxiWeekendPolygons.objects.filter(hour=prediction_hour, day=prediction_day)))

    intersecting_polygons = []

    for poly in all_objects:
        intersecting_polygons.append(Polygon(poly.polygon['coordinates'][0]))

    start_buffer = Polygon(create_buffer_polygon(coordinates[0]))
    end_buffer = Polygon(create_buffer_polygon(coordinates[1]))

    intersecting_polygons_copy = intersecting_polygons.copy()
    for poly in intersecting_polygons_copy:
        if poly.intersects(start_buffer) or poly.intersects(end_buffer):
            intersecting_polygons.remove(poly)

    avoided_point_list = []
    # Create regular route with still empty avoided_point_list
    optimal_directions = create_route(coordinates, avoided_point_list)

    optimal_coordinates_list = []
    for feature in optimal_directions['features']:
        optimal_coordinates = feature['geometry']['coordinates']
        optimal_coordinates_list.extend(optimal_coordinates)
    print('Generated regular route.')

    try:
        avoidance_route = create_route(coordinates, intersecting_polygons, 1)
        avoidance_coordinates_list = []
        for feature in avoidance_route['features']:
            avoidance_coordinates = feature['geometry']['coordinates']
            avoidance_coordinates_list.extend(avoidance_coordinates)
        if avoidance_coordinates_list == optimal_coordinates_list:
            avoidance_route = ""
            status = "no_rerouting"
        else:
            status = "rerouting_success"

    # indicates an exception occurred while using the API
    except Exception as e:
        status = "exception_raised"
        avoidance_route = ""
        print(e)

    end = time.time()
    print("Elapsed time: " + str(end - start))

    # return json back to react front end
    return JsonResponse({
        'optimal_directions': optimal_directions,
        'avoidance_directions': avoidance_route,
        'status': status
    })


# on click for the noise heatmap, a POST request returns all the coordinates in the database for the noise data
# for heatmap generation and the associated noise count value
@api_view(['POST'])
def noise_heatmap_view(request):
    # initialises time and day as current time and day
    now = datetime.now()
    prediction_hour = int(now.strftime("%H"))
    prediction_day = now.weekday()

    # when the values are empty, the datepicker frontend has not been changed, meaning it is the current time
    if request.data["time"] != "" and request.data["date"] != "":
        prediction_hour = request.data["time"][0:2]
        prediction_day = pd.Timestamp(request.data["date"]).day_of_week

    # filters through all the locations to match the current time and date
    if 0 <= prediction_day <= 4:
        locations = list(NoiseLocations.objects.filter(hour=prediction_hour, weekday=1, weekend=0))
    else:
        locations = list(NoiseLocations.objects.filter(hour=prediction_hour, weekday=0, weekend=1))

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:

        if 0 <= location.count <= 0.19:
            continue
        elif 0.20 <= location.count <= 0.39:
            count_value = 0.25
        elif 0.40 <= location.count <= 0.59:
            count_value = 0.5
        elif 0.60 <= location.count <= 0.79:
            count_value = 0.75
        elif 0.80 <= location.count <= 1:
            count_value = 1

        response_dict = {
            'long': location.long,
            'lat': location.lat,
            'count': count_value
        }
        response_list.append(response_dict)

    # creates a JSON object and sends it to the frontend
    return JsonResponse(response_list, safe=False)


# on click for the busyness heatmap, a POST request returns all the coordinates in the database for the busyness data
# for heatmap generation and the associated busyness count value
@api_view(['POST'])
def busyness_heatmap_view(request):
    # initialises time and day as current time and day
    now = datetime.now()
    prediction_hour = int(now.strftime("%H"))
    prediction_day = now.weekday()

    # when the values are empty, the datepicker frontend has not been changed, meaning it is the current time
    if request.data["time"] != "" and request.data["date"] != "":
        prediction_hour = request.data["time"][0:2]
        prediction_day = pd.Timestamp(request.data["date"]).day_of_week

    if 0 <= prediction_day <= 4:
        # filters through all the locations to match the current time and date
        locations = TaxiWeekdayLocations.objects.filter(hour=prediction_hour, day=prediction_day)
    else:
        locations = TaxiWeekendLocations.objects.filter(hour=prediction_hour, day=prediction_day)

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        if 0 <= location.count <= 0.19:
            continue
        elif 0.20 <= location.count <= 0.39:
            count_value = 0.25
        elif 0.40 <= location.count <= 0.59:
            count_value = 0.5
        elif 0.60 <= location.count <= 0.79:
            count_value = 0.75
        elif 0.80 <= location.count <= 1:
            count_value = 1

        response_dict = {
            'long': location.long,
            'lat': location.lat,
            'count': count_value
        }
        response_list.append(response_dict)

    # creates a JSON object and sends it to the frontend
    return JsonResponse(response_list, safe=False)


@api_view(['POST'])
def combined_heatmap_view(request):
    # initialises time and day as current time and day
    now = datetime.now()
    prediction_hour = int(now.strftime("%H"))
    prediction_day = now.weekday()

    # when the values are empty, the datepicker frontend has not been changed, meaning it is the current time
    if request.data["time"] != "" and request.data["date"] != "":
        prediction_hour = request.data["time"][0:2]
        prediction_day = pd.Timestamp(request.data["date"]).day_of_week

    if 0 <= prediction_day <= 4:
        # filters through all the locations to match the current time and date
        locations = list(
            chain(NoiseLocations.objects.filter(hour=prediction_hour, weekday=1, weekend=0),
                  TaxiWeekdayLocations.objects.filter(hour=prediction_hour, day=prediction_day)))
    else:
        locations = list(
            chain(NoiseLocations.objects.filter(hour=prediction_hour, weekday=0, weekend=1),
                  TaxiWeekendLocations.objects.filter(hour=prediction_hour, day=prediction_day)))

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        if 0 <= location.count <= 0.19:
            continue
        elif 0.20 <= location.count <= 0.39:
            count_value = 0.25
        elif 0.40 <= location.count <= 0.59:
            count_value = 0.5
        elif 0.60 <= location.count <= 0.79:
            count_value = 0.75
        elif 0.80 <= location.count <= 1:
            count_value = 1

        response_dict = {
            'long': location.long,
            'lat': location.lat,
            'count': count_value
        }
        response_list.append(response_dict)

    # creates a JSON object and sends it to the frontend
    return JsonResponse(response_list, safe=False)


@api_view(['POST'])
def register_view(request):
    user = request.data['user']
    password = request.data['password']
    user_entry = Accounts(user=user, password=password)
    user_entry.save()
    return JsonResponse({'message': 'User registered successfully.'})


@api_view(['POST'])
def login_view(request):
    user = request.data['user']
    password = request.data['password']
    user_details = list(Accounts.objects.filter(user=user, password=password))

    serialized_user_details = serializers.serialize('json', user_details)
    json_user_details = json.loads(serialized_user_details)

    return JsonResponse(json_user_details, safe=False)


@api_view(['POST'])
def ratings_view(request):
    rating = Ratings(ratings=request.data['rating'])
    rating.save()
    return JsonResponse({'message': 'Rating Recorded Successfully.'})
