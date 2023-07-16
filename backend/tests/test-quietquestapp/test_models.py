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
        assert response.__str__() == "40.86333333,-73.92777777,0,0,1,4"


class Test_TaxiWeekdayLocationsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_TaxiWeekdayLocationsModel_str_return(self, taxi_weekday_locations_factory):
        # Get the expected coordinates string
        response = taxi_weekday_locations_factory()
        print(response)
        assert response.__str__() == "40.86333333,-73.92777777,0,4"


class Test_TaxiWeekendLocationsModel:
    # Testing the models' Locations class string method
    # locations_factory comes from registered LocationsFactory.
    # we can then access the LocationsFactory in lower case and utilizing the underscore between locations and
    # factory. That's the kind of format that's going to happen if we would call another registered factory
    def test_TaxiWeekendLocationsModel_str_return(self, taxi_weekend_locations_factory):
        # Get the expected coordinates string
        response = taxi_weekend_locations_factory()
        print(response)
        assert response.__str__() == "40.86333333,-73.92777777,0,4"
