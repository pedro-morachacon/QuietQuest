# File to create factories which are pieces of code that are pieces of code we can reuse whenever we run tests that require data in our database. This file is created in the Tests root folder where all the Django app tests('quietquestapp') subdirectories are.
# Import factory-boy as fixtures replacement library to generate fake data for your tests
import factory

# Import each data table from the Django app models
from quietquestapp.models import NoiseLocations, TaxiWeekdayLocations, TaxiWeekendLocations, Accounts


# This class creates new data(database) for the testing
# "factory.django.DjangoModelFactory" uses information that
# has already been written in our model to create the data
class NoiseLocationsFactory(factory.django.DjangoModelFactory):
    # specify the model that we're using in test
    class Meta:
        model = NoiseLocations

    # Create testing data values 
    lat = 40.86333333
    long = -73.92777777
    hour = 0
    weekday = 0
    weekend = 1
    count = 4


class TaxiWeekdayLocationsFactory(factory.django.DjangoModelFactory):
    # specify the model that we're using in test
    class Meta:
        model = TaxiWeekdayLocations

    # Create testing data values
    lat = 40.86333333
    long = -73.92777777
    hour = 0
    count = 4


class TaxiWeekendLocationsFactory(factory.django.DjangoModelFactory):
    # specify the model that we're using in test
    class Meta:
        model = TaxiWeekendLocations

    # Create testing data values
    lat = 40.86333333
    long = -73.92777777
    hour = 0
    count = 4


class AccountsFactory(factory.django.DjangoModelFactory):
    # specify the model that we're using in test
    class Meta:
        model = Accounts

    # Create testing data values
    user = "Test"
    password = "Aa12345"
