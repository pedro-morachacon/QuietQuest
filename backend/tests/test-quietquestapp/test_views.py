import pytest
from django.http import JsonResponse
from quietquestapp.models import NoiseLocations, TaxiWeekdayLocations, Accounts
from quietquestapp.views import directions_view, noise_heatmap_view, busyness_heatmap_view, combined_heatmap_view, \
    register_view, login_view
from django.test import RequestFactory
import json
from datetime import datetime


@pytest.mark.django_db
def test_directions_view():

    noise_locations_objects = []
    taxi_locations_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, count=4))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, count=4))
        noise_locations_objects.append(NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=4))
        noise_locations_objects.append(NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=4))

    # Bulk create the Locations objects
    TaxiWeekdayLocations.objects.bulk_create(taxi_locations_objects)
    NoiseLocations.objects.bulk_create(noise_locations_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 1)
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
def test_noise_heatmap_view():
    noise_locations_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        noise_locations_objects.append(
            NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=4))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=4))

    # Bulk create the Locations objects
    NoiseLocations.objects.bulk_create(noise_locations_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 1)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "time": prediction_hour,
        "date": prediction_date
    }

    request = factory.post('/noiseheatmap/', data=payload, content_type='application/json')

    # Call the function being tested
    response = noise_heatmap_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)


@pytest.mark.django_db
def test_busyness_heatmap_view():
    taxi_locations_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, count=4))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, count=4))

    # Bulk create the Locations objects
    TaxiWeekdayLocations.objects.bulk_create(taxi_locations_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 1)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "time": prediction_hour,
        "date": prediction_date
    }

    request = factory.post('/busynessheatmap/', data=payload, content_type='application/json')

    # Call the function being tested
    response = busyness_heatmap_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)


@pytest.mark.django_db
def test_combined_heatmap_view():
    noise_locations_objects = []
    taxi_locations_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, count=0))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, count=4))
        taxi_locations_objects.append(TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, count=4))
        noise_locations_objects.append(
            NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=4))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=4))

    # Bulk create the Locations objects
    TaxiWeekdayLocations.objects.bulk_create(taxi_locations_objects)
    NoiseLocations.objects.bulk_create(noise_locations_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 1)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "time": prediction_hour,
        "date": prediction_date
    }

    request = factory.post('/combinedheatmap/', data=payload, content_type='application/json')

    # Call the function being tested
    response = combined_heatmap_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)


@pytest.mark.django_db
def test_register_view():
    # Create dummy data for accounts table
    user = "Test"
    password = "Aa12345"

    # Create a request factory
    factory = RequestFactory()

    # Create a POST request with JSON payload
    payload = {
        "user": user,
        "password": password
    }

    request = factory.post('/register/', data=payload, content_type='application/json')

    # Call the function being tested
    response = register_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)


@pytest.mark.django_db
def test_login_view():
    # Create dummy data for accounts table
    user = "Test"
    password = "Aa12345"
    user_entry = Accounts(user=user, password=password)
    user_entry.save()

    # Create a request factory
    factory = RequestFactory()

    # Create a POST request with JSON payload
    payload = {
        "user": user,
        "password": password
    }

    request = factory.post('/login/', data=payload, content_type='application/json')

    # Call the function being tested
    response = login_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)
