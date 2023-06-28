# File registering our factories with pytest so we can use them

# Import register factory library
from pytest_factoryboy import register

# Import specific factories
from .factories import LocationsFactory

# register specific factories
register(LocationsFactory)
