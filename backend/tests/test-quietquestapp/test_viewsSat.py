import pytest
from django.http import JsonResponse
from quietquestapp.models import Locations
from quietquestapp.views import directions_view, locations_view
from django.test import RequestFactory
import json
from datetime import datetime



@pytest.mark.django_db
def test_directions_view():

    locations_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        locations_objects.append(Locations(long=-74.002614, lat=40.747031, hour=hour, weekday=1, weekend=0, count=0))
        locations_objects.append(Locations(long=-74.002614, lat=40.747031, hour=hour, weekday=0, weekend=1, count=0))
        locations_objects.append(Locations(long=-73.994052, lat=40.743439, hour=hour, weekday=1, weekend=0, count=0))
        locations_objects.append(Locations(long=-73.994052, lat=40.743439, hour=hour, weekday=0, weekend=1, count=0))
        locations_objects.append(Locations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=4))
        locations_objects.append(Locations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=4))

    # Bulk create the Locations objects
    Locations.objects.bulk_create(locations_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 2)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "locations": "-74.002614, 40.747031, -73.994052, 40.743439",
        "time": prediction_hour,
        "date": prediction_date
    }
    request = factory.post('/directions/', data=payload, content_type='application/json')

    # Call the function being tested
    response = directions_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)
    response_data = json.loads(response.content)
    assert 'optimal_directions' in response_data
    assert 'avoidance_directions' in response_data


@pytest.mark.django_db
def test_locations_view():
    locations_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        locations_objects.append(Locations(long=-74.002614, lat=40.747031, hour=hour, weekday=1, weekend=0, count=0))
        locations_objects.append(Locations(long=-74.002614, lat=40.747031, hour=hour, weekday=0, weekend=1, count=0))
        locations_objects.append(Locations(long=-73.994052, lat=40.743439, hour=hour, weekday=1, weekend=0, count=0))
        locations_objects.append(Locations(long=-73.994052, lat=40.743439, hour=hour, weekday=0, weekend=1, count=0))
        locations_objects.append(Locations(long=-73.99675563, lat=40.74457668, hour=hour, weekday=1, weekend=0,
                                           count=4))
        locations_objects.append(Locations(long=-73.99675563, lat=40.74457668, hour=hour, weekday=0, weekend=1,
                                           count=4))

    # Bulk create the Locations objects
    Locations.objects.bulk_create(locations_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 2)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())
    print(prediction_date)
    # Create a POST request with JSON payload
    payload = {
        "time": prediction_hour,
        "date": prediction_date
    }

    request = factory.post('/directions/', data=payload, content_type='application/json')

    # Call the function being tested
    response = locations_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)
