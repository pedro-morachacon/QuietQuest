import pytest
from django.http import JsonResponse
from django.apps import apps
from quietquestapp.models import NoiseLocations, TaxiWeekdayLocations, Accounts, NoisePolygons, TaxiWeekdayPolygons, Ratings
from quietquestapp.views import directions_view, noise_heatmap_view, busyness_heatmap_view, combined_heatmap_view, \
    register_view, login_view, ratings_view, front_page, firebaseauth_page, account_page, contact_page, feedback_page, \
    rating_page, resetpwd_page, save_link_icon_page, weather_page, error_page
from django.test import RequestFactory
import json
from datetime import datetime
from django.urls import reverse


@pytest.mark.django_db
def test_directions_view_no_rerouting_all():
    noise_polygon_objects = []
    taxi_polygon_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        for day in range(0, 5):
            taxi_polygon_objects.append(TaxiWeekdayPolygons(polygon={"type": "Polygon", "coordinates": [
                [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
                 [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
                 [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
                 [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
                 [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
                 [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
                 [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
                 [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
                 [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
                 [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
                 [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
                 [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
                 [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
                 [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
                 [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
                 [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
                 [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
                 [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
                 [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
                 [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
                 [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
                 [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
                 [-73.98475002353818, 40.7447177532158]]]}, hour=hour, day=day))

        noise_polygon_objects.append(NoisePolygons(polygon={"type": "Polygon", "coordinates": [
            [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
             [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
             [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
             [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
             [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
             [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
             [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
             [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
             [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
             [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
             [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
             [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
             [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
             [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
             [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
             [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
             [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
             [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
             [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
             [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
             [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
             [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
             [-73.98475002353818, 40.7447177532158]]]}, hour=hour, weekday=1, weekend=0))

    # Bulk create the Locations objects
    TaxiWeekdayPolygons.objects.bulk_create(taxi_polygon_objects)
    NoisePolygons.objects.bulk_create(noise_polygon_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 1)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "locations": [[-73.985362, 40.744498], [-73.983881, 40.746465]],
        "time": prediction_hour,
        "date": prediction_date,
        "tab": ""
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
def test_directions_view_no_rerouting_crowds():
    noise_polygon_objects = []
    taxi_polygon_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        for day in range(0, 5):
            taxi_polygon_objects.append(TaxiWeekdayPolygons(polygon={"type": "Polygon", "coordinates": [
                [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
                 [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
                 [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
                 [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
                 [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
                 [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
                 [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
                 [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
                 [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
                 [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
                 [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
                 [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
                 [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
                 [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
                 [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
                 [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
                 [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
                 [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
                 [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
                 [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
                 [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
                 [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
                 [-73.98475002353818, 40.7447177532158]]]}, hour=hour, day=day))

        noise_polygon_objects.append(NoisePolygons(polygon={"type": "Polygon", "coordinates": [
            [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
             [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
             [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
             [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
             [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
             [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
             [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
             [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
             [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
             [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
             [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
             [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
             [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
             [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
             [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
             [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
             [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
             [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
             [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
             [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
             [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
             [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
             [-73.98475002353818, 40.7447177532158]]]}, hour=hour, weekday=1, weekend=0))

    # Bulk create the Locations objects
    TaxiWeekdayPolygons.objects.bulk_create(taxi_polygon_objects)
    NoisePolygons.objects.bulk_create(noise_polygon_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 1)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "locations": [[-73.985362, 40.744498], [-73.983881, 40.746465]],
        "time": prediction_hour,
        "date": prediction_date,
        "tab": "crowds"
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
def test_directions_view_no_rerouting_noise():
    noise_polygon_objects = []
    taxi_polygon_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        for day in range(0, 5):
            taxi_polygon_objects.append(TaxiWeekdayPolygons(polygon={"type": "Polygon", "coordinates": [
                [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
                 [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
                 [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
                 [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
                 [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
                 [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
                 [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
                 [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
                 [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
                 [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
                 [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
                 [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
                 [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
                 [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
                 [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
                 [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
                 [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
                 [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
                 [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
                 [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
                 [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
                 [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
                 [-73.98475002353818, 40.7447177532158]]]}, hour=hour, day=day))

        noise_polygon_objects.append(NoisePolygons(polygon={"type": "Polygon", "coordinates": [
            [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
             [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
             [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
             [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
             [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
             [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
             [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
             [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
             [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
             [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
             [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
             [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
             [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
             [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
             [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
             [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
             [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
             [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
             [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
             [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
             [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
             [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
             [-73.98475002353818, 40.7447177532158]]]}, hour=hour, weekday=1, weekend=0))

    # Bulk create the Locations objects
    TaxiWeekdayPolygons.objects.bulk_create(taxi_polygon_objects)
    NoisePolygons.objects.bulk_create(noise_polygon_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 1)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "locations": [[-73.985362, 40.744498], [-73.983881, 40.746465]],
        "time": prediction_hour,
        "date": prediction_date,
        "tab": "noise"
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
def test_directions_view_rerouting():
    noise_polygon_objects = []
    taxi_polygon_objects = []

    # Create dummy data for Locations table
    for hour in range(0, 23):
        taxi_polygon_objects.append(TaxiWeekdayPolygons(polygon={"type": "Polygon", "coordinates": [
            [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
             [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
             [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
             [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
             [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
             [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
             [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
             [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
             [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
             [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
             [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
             [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
             [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
             [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
             [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
             [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
             [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
             [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
             [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
             [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
             [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
             [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
             [-73.98475002353818, 40.7447177532158]]]}, hour=hour))

        noise_polygon_objects.append(NoisePolygons(polygon={"type": "Polygon", "coordinates": [
            [[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443],
             [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046],
             [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454],
             [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168],
             [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455],
             [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964],
             [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575],
             [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325],
             [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207],
             [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325],
             [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575],
             [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557],
             [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796],
             [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544],
             [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996],
             [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545],
             [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204],
             [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442],
             [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767],
             [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794],
             [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767],
             [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442],
             [-73.98475002353818, 40.7447177532158]]]}, hour=hour, weekday=1, weekend=0))

    # Bulk create the Locations objects
    TaxiWeekdayPolygons.objects.bulk_create(taxi_polygon_objects)
    NoisePolygons.objects.bulk_create(noise_polygon_objects)

    # Create a request factory
    factory = RequestFactory()

    # initialises time and day as current time and day
    now = datetime(2100, 1, 2)
    prediction_hour = now.strftime("%H")
    prediction_date = str(now.date())

    # Create a POST request with JSON payload
    payload = {
        "locations": [[-73.986349, 40.743182], [-73.98287782229693, 40.747928761902976]],
        "time": prediction_hour,
        "date": prediction_date,
        "tab": ""
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
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.8800000000000004))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.8800000000000004))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.25))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.25))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.5))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.5))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.75))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.75))

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
        for day in range(0, 5):
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, day=day, count=0.8800000000000004))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, day=day, count=0.8800000000000004))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.25))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.25))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.5))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.5))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.75))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.75))

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
        for day in range(0, 5):
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.002614, lat=40.747031, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.994052, lat=40.743439, hour=hour, day=day, count=0))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, day=day, count=0.8800000000000004))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-73.99675563, lat=40.74457668, hour=hour, day=day, count=0.8800000000000004))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.25))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.25))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.5))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.5))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.75))
            taxi_locations_objects.append(
                TaxiWeekdayLocations(long=-74.000048, lat=40.745949, hour=hour, day=day, count=0.75))
        noise_locations_objects.append(
            NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-74.002614, lat=40.747031, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=1, weekend=0, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-73.994052, lat=40.743439, hour=hour, weekday=0, weekend=1, count=0))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.8800000000000004))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.8800000000000004))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.25))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.25))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.5))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.5))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=1, weekend=0, count=0.75))
        noise_locations_objects.append(
            NoiseLocations(long=-74.000048, lat=40.745949, hour=hour, weekday=0, weekend=1, count=0.75))

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


@pytest.mark.django_db
def test_ratings_view():
    # Create dummy data for accounts table
    rating = 4
    rating_entry = Ratings(ratings=rating)
    rating_entry.save()

    # Create a request factory
    factory = RequestFactory()

    # Create a POST request with JSON payload
    payload = {
        "rating": rating,
    }

    request = factory.post('/ratings/', data=payload, content_type='application/json')

    # Call the function being tested
    response = ratings_view(request)

    # Assert the expected behavior of the function
    assert isinstance(response, JsonResponse)

@pytest.mark.django_db
def test_home_page_view(client):
    url = reverse(front_page)
    response = client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_firebaseauth_page_view(client):
    url = reverse(firebaseauth_page)
    response = client.get(url)
    assert response.status_code == 200

@pytest.mark.django_db
def test_account_page(client):
    url = reverse(account_page)
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_contact_page(client):
    url = reverse(contact_page)
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_feedback_page(client):
    url = reverse(feedback_page)
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_rating_page(client):
    url = reverse(rating_page)
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_resetpwd_page(client):
    url = reverse(resetpwd_page)
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_save_link_icon_page(client):
    url = reverse(save_link_icon_page)
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_weather_page(client):
    url = reverse(weather_page)
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_error_page(client):
    url = reverse(error_page)
    response = client.get(url)
    assert response.status_code == 200
