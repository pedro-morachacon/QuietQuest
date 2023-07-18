# File registering our factories with pytest so we can use them

# Import register factory library
from pytest_factoryboy import register

# Import specific factories
from .factories import NoiseLocationsFactory, TaxiWeekdayLocationsFactory, TaxiWeekendLocationsFactory, AccountsFactory

# register specific factories
register(NoiseLocationsFactory)
register(TaxiWeekdayLocationsFactory)
register(TaxiWeekendLocationsFactory)
register(AccountsFactory)
