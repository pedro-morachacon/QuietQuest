import pytest
from django.http import JsonResponse
from quietquestapp.models import Locations
from quietquestapp.views import directions_view, locations_view
from django.test import RequestFactory
import json


@pytest.mark.django_db
def test_directions_view():
    # Create dummy data for Locations table
    Locations.objects.create(long=11.653227, lat=52.145416)
    Locations.objects.create(long=11.62847, lat=52.1303)
    Locations.objects.create(long=11.653222, lat=52.144883)

    # Create a request factory
    factory = RequestFactory()

    # Create a POST request with JSON payload
    payload = [[11.653227, 52.145416], [11.62847, 52.1303]]
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
    # Create dummy data for Locations table
    Locations.objects.create(long=11.653361, lat=52.144116)
    Locations.objects.create(long=11.62847, lat=52.1303)

    # Create a request factory
    factory = RequestFactory()

    # Create a GET request with JSON payload
    request = factory.get('')

    # Call the function being tested
    response = locations_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)

