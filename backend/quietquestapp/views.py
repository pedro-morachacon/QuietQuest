from django.http import JsonResponse

from rest_framework.decorators import api_view

from openrouteservice import client
from shapely.geometry import Polygon, mapping, MultiPolygon, LineString, Point
from pyproj import Transformer

# separate file with api keys
from . import info

from .models import NoiseLocations, TaxiWeekdayLocations, TaxiWeekendLocations, Accounts, Ratings
from datetime import datetime
import pandas as pd
import time
from itertools import chain
import json
from django.core import serializers


# returns all coordinate values in the database for the given hour and given weekday/weekend value, only returns those
# with a count of 4
def predicted_locations(hour, day):
    # gets the current day of the week and assigning binary value for weekend/weekday
    if 0 <= day <= 4:
        weekday_value = 1
        weekend_value = 0
        locations = list(chain(NoiseLocations.objects.filter(hour=hour, weekday=weekday_value, weekend=weekend_value,
                                                             count=4), TaxiWeekdayLocations.objects.filter(hour=hour,
                                                                                                           count=4)))
    else:
        weekday_value = 0
        weekend_value = 1
        locations = list(chain(NoiseLocations.objects.filter(hour=hour, weekday=weekday_value, weekend=weekend_value,
                                                             count=4), TaxiWeekendLocations.objects.filter(hour=hour,
                                                                                                           count=4)))

    # df = pd.DataFrame(list(NoiseLocations.objects.filter(count=4).values()))
    # print(df["hour"].unique())

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        response_dict = {
            'long': location.long,
            'lat': location.lat,
        }
        response_list.append(response_dict)
    return response_list


# Expects POST operation from react front end, request contains the coordinates of the start and destination
# will be expanded to include date and time
@api_view(['POST'])
def directions_view(request):
    start = time.time()

    def create_buffer_polygon(transformer_wgs84_to_utm32n, transformer_utm32n_to_wgs84, point_in, resolution=2,
                              radius=100):
        point_in_proj = transformer_wgs84_to_utm32n.transform(*point_in)
        point_buffer_proj = Point(point_in_proj).buffer(radius, resolution=resolution)  # 100 m buffer

        # Transform back to WGS84
        poly_wgs = [transformer_utm32n_to_wgs84.transform(*point) for point in point_buffer_proj.exterior.coords]
        return poly_wgs

    # sends route request to api with start and destination coordinates and polygons to avoid
    def create_route(data, avoided_point_list, n=0):
        route_request = {'coordinates': data,
                         'format': 'geojson',
                         'profile': 'foot-walking',
                         'preference': 'shortest',
                         'instructions': True,
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

    # initialises time and day as current time and day
    now = datetime.now()
    prediction_hour = int(now.strftime("%H"))
    prediction_day = now.weekday()

    # when the values are empty, the datepicker frontend has not been changed, meaning it is the current time
    if request.data["time"] != "" and request.data["date"] != "":
        prediction_hour = request.data["time"][0:2]
        prediction_day = pd.Timestamp(request.data["date"]).day_of_week

    high_index_value_ls = []
    point_geometry = []
    transformer_wgs84_to_utm32n = Transformer.from_crs("EPSG:4326", "EPSG:3857")
    transformer_utm32n_to_wgs84 = Transformer.from_crs("EPSG:3857", "EPSG:4326")

    # pass hour and day to be used in route prediction
    all_locations = predicted_locations(prediction_hour, prediction_day)

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

    # makes avoidance route empty initially, status is for the front end error messaging
    avoidance_route = ""
    # indicates no rerouting was needed
    status = "no_rerouting"
    attempts = 0

    try:
        for site_poly in high_index_value_ls:
            poly = Polygon(site_poly)
            if poly.within(avoidance_directions):
                # limits rerouting to 5 tries to preserve API quota and reduce processing time
                if attempts < 2:
                    avoided_point_list.append(poly)
                    avoidance_route = create_route(coordinates, avoided_point_list, 1)
                    avoidance_directions = create_buffer(avoidance_route)
                    attempts += 1
                    # indicates routing was completed successfully, in under 5 attempts
                    status = "rerouting_success"
                    print('Generated alternative route, which avoids affected areas.')

                else:
                    # indicates that too many attempts were made and the avoidance route only avoids a maximum
                    # of 5 busy areas
                    status = "many_reroutes"
                    return JsonResponse({
                        'optimal_directions': optimal_directions,
                        'avoidance_directions': avoidance_route,
                        'status': status
                    })

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

    if 0 <= prediction_day <= 4:
        weekday_value = 1
        weekend_value = 0
    else:
        weekday_value = 0
        weekend_value = 1

    # filters through all the locations to match the current time and date
    locations = NoiseLocations.objects.filter(hour=prediction_hour, weekday=weekday_value, weekend=weekend_value)

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        response_dict = {
            'long': location.long,
            'lat': location.lat,
            # temp divided by 4 for the frontend gradient
            'count': location.count / 4
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
        locations = TaxiWeekdayLocations.objects.filter(hour=prediction_hour)
    else:
        locations = TaxiWeekendLocations.objects.filter(hour=prediction_hour)

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        response_dict = {
            'long': location.long,
            'lat': location.lat,
            # temp divided by 4 for the frontend gradient
            'count': location.count / 4
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
        locations = list(chain(NoiseLocations.objects.filter(hour=prediction_hour), TaxiWeekdayLocations.objects
                               .filter(hour=prediction_hour)))
    else:
        locations = list(chain(NoiseLocations.objects.filter(hour=prediction_hour), TaxiWeekendLocations.objects
                               .filter(hour=prediction_hour)))

    # creates a list of dictionaries to send to the frontend, containing the coordinates and the count value
    response_list = []
    for location in locations:
        response_dict = {
            'long': location.long,
            'lat': location.lat,
            # temp divided by 4 for the frontend gradient
            'count': location.count / 4
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
