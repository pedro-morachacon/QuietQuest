# File registering our factories with pytest so we can use them

# Import register factory library
from pytest_factoryboy import register

# Import specific factories
from .factories import (
    AccountsFactory,
    NoiseLocationsFactory,
    NoisePolygonsFactory,
    RatingsFactory,
    TaxiWeekdayLocationsFactory,
    TaxiWeekdayPolygonsFactory,
    TaxiWeekendLocationsFactory,
    TaxiWeekendPolygonsFactory,
)

# register specific factories
register(NoiseLocationsFactory)
register(TaxiWeekdayLocationsFactory)
register(TaxiWeekendLocationsFactory)
register(NoisePolygonsFactory)
register(TaxiWeekdayPolygonsFactory)
register(TaxiWeekendPolygonsFactory)
register(AccountsFactory)
register(RatingsFactory)
