# File to test file 'models.py' in Django 'quietquestapp' App
# Get pytest libraries
import pytest

# Create a blanket setup where all the classes in this test file will be able to access the django database
pytestmark = pytest.mark.django_db()


# We'll use classes because they allow us to neatly group tests together(Grouping here the different tests
# for the file 'models.py').


# Testing the models Locations class
class Test_NoiseLocationsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_NoiseLocationsModel_str_return(self, noise_locations_factory):
        # Get the expected coordinates string
        response = noise_locations_factory()
        print(response)
        assert response.__str__() == "40.86333333,-73.92777777,0,0,1,0.8800000000000004"


class Test_TaxiWeekdayLocationsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_TaxiWeekdayLocationsModel_str_return(self, taxi_weekday_locations_factory):
        # Get the expected coordinates string
        response = taxi_weekday_locations_factory()
        print(response)
        assert response.__str__() == "40.86333333,-73.92777777,0,0,0.8800000000000004"


class Test_TaxiWeekendLocationsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_TaxiWeekendLocationsModel_str_return(self, taxi_weekend_locations_factory):
        # Get the expected coordinates string
        response = taxi_weekend_locations_factory()
        print(response)
        assert response.__str__() == "40.86333333,-73.92777777,0,5,0.8800000000000004"


class Test_NoisePolygonsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_NoisePolygons_str_return(self, noise_polygons_factory):
        # Get the expected coordinates string
        response = noise_polygons_factory()
        print(response)
        assert (
            response.__str__()
            == "{'type': 'Polygon', 'coordinates': [[[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443], [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046], [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454], [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168], [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455], [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964], [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575], [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325], [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207], [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325], [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575], [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557], [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796], [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544], [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996], [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545], [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204], [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442], [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767], [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794], [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767], [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442], [-73.98475002353818, 40.7447177532158]]]},0,1,0"
        )


class Test_TaxiWeekdayPolygonsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_TaxiWeekdayPolygons_str_return(self, taxi_weekday_polygons_factory):
        # Get the expected coordinates string
        response = taxi_weekday_polygons_factory()
        print(response)
        assert (
            response.__str__()
            == "{'type': 'Polygon', 'coordinates': [[[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443], [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046], [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454], [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168], [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455], [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964], [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575], [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325], [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207], [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325], [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575], [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557], [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796], [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544], [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996], [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545], [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204], [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442], [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767], [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794], [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767], [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442], [-73.98475002353818, 40.7447177532158]]]},0,0"
        )


class Test_TaxiWeekendPolygonsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_TaxiWeekendPolygons_str_return(self, taxi_weekend_polygons_factory):
        # Get the expected coordinates string
        response = taxi_weekend_polygons_factory()
        print(response)
        assert (
            response.__str__()
            == "{'type': 'Polygon', 'coordinates': [[[-73.98475002353818, 40.7447177532158], [-73.98477377389146, 40.74472830383443], [-73.98484770496228, 40.744774077585475], [-73.98491084779874, 40.744827671762046], [-73.98496164774683, 40.74488776669762], [-73.9849988540624, 40.744952882655454], [-73.98502155069706, 40.74502141626455], [-73.98502917884507, 40.74509168], [-73.98502155069706, 40.745161943735454], [-73.9849988540624, 40.74523047734455], [-73.98496164774683, 40.74529559330238], [-73.98491084779874, 40.745355688237964], [-73.98484770496228, 40.74540928241453], [-73.98477377389146, 40.745455056165575], [-73.98469087488256, 40.74549188238947], [-73.98460104906505, 40.745518854302325], [-73.98450650815411, 40.74553530776616], [-73.98440958, 40.74554083764207], [-73.98431265127462, 40.74553530776616], [-73.98421810870582, 40.745518854302325], [-73.98412828030612, 40.74549188238947], [-73.98404537804342, 40.745455056165575], [-73.98404025895782, 40.74545188688484], [-73.98401650740409, 40.74544133616557], [-73.98394257259669, 40.74539556241452], [-73.98387942604252, 40.74534196823796], [-73.9838286227515, 40.745281873302375], [-73.98379141378842, 40.745216757344544], [-73.98376871545602, 40.74514822373545], [-73.98376108672336, 40.745077959999996], [-73.98376871545602, 40.745007696264544], [-73.98379141378842, 40.74493916265545], [-73.9838286227515, 40.74487404669762], [-73.98387942604252, 40.74481395176204], [-73.98394257259669, 40.74476035758547], [-73.98401650740409, 40.74471458383442], [-73.9840994098123, 40.74467775761053], [-73.9841892383697, 40.74465078569767], [-73.98428378110447, 40.744634332233844], [-73.98438071, 40.74462880235794], [-73.98447763832426, 40.744634332233844], [-73.98457217940116, 40.74465078569767], [-73.98466200537634, 40.74467775761053], [-73.98474490453077, 40.74471458383442], [-73.98475002353818, 40.7447177532158]]]},0,5"
        )


class Test_AccountsModel:
    def test_AccountsModel_str_return(self, accounts_factory):
        # Get the expected coordinates string
        response = accounts_factory()
        print(response)
        assert response.__str__() == "Test,Aa12345"


class Test_RatingsModel:
    def test_RatingsModel_str_return(self, ratings_factory):
        # Get the expected coordinates string
        response = ratings_factory()
        print(response)
        assert response.__str__() == "4"
