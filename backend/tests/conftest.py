# File registering our factories with pytest so we can use them

# Import register factory library
from pytest_factoryboy import register

# Import specific factories
from .factories import NoiseLocationsFactory, TaxiWeekdayLocationsFactory, TaxiWeekendLocationsFactory, AccountsFactory, NoisePolygonsFactory, TaxiWeekdayPolygonsFactory, TaxiWeekendPolygonsFactory, RatingsFactory

# register specific factories
register(NoiseLocationsFactory)
register(TaxiWeekdayLocationsFactory)
register(TaxiWeekendLocationsFactory)
register(NoisePolygonsFactory)
register(TaxiWeekdayPolygonsFactory)
register(TaxiWeekendPolygonsFactory)
register(AccountsFactory)
register(RatingsFactory)
