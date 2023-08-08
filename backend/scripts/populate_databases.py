import json
import time

import pandas as pd
from quietquestapp.models import (
    NoiseLocations,
    NoisePolygons,
    TaxiWeekdayLocations,
    TaxiWeekdayPolygons,
    TaxiWeekendLocations,
    TaxiWeekendPolygons,
)
from shapely.geometry import mapping, shape


def run():
    # Delete all objects currently stored in the Noise models
    NoiseLocations.objects.all().delete()
    NoisePolygons.objects.all().delete()

    # Delete all objects currently stored in the Taxi Weekday models
    TaxiWeekdayLocations.objects.all().delete()
    TaxiWeekdayPolygons.objects.all().delete()

    # Delete all objects currently stored in the Taxi Weekend models
    TaxiWeekendLocations.objects.all().delete()
    TaxiWeekendPolygons.objects.all().delete()

    # Read the CSV file using pandas with chunksize
    chunksize = 30000
    for df_chunk in pd.read_csv(
        "quietquestapp/quietquestapp_noiselocations.csv", chunksize=chunksize
    ):
        start = time.time()
        values = []

        for _, row in df_chunk.iterrows():
            long = row["long"]
            lat = row["lat"]
            hour = row["hour"]
            weekday = row["weekday"]
            weekend = row["weekend"]
            count = row["count"]

            # Create Locations objects for bulk_create
            values.append(
                NoiseLocations(
                    long=long,
                    lat=lat,
                    hour=hour,
                    weekday=weekday,
                    weekend=weekend,
                    count=count,
                )
            )

        # Bulk create the Locations objects
        NoiseLocations.objects.bulk_create(values)
        end = time.time()
        print("NoiseLocations Chunk Time: " + str(end - start))

    # Read the CSV file using pandas with chunksize
    chunksize = 30000
    for df_chunk in pd.read_csv(
        "quietquestapp/quietquestapp_noisepolygons.csv", chunksize=chunksize
    ):
        start = time.time()
        values = []

        for _, row in df_chunk.iterrows():
            polygon = row["polygon"]
            hour = row["hour"]
            weekday = row["weekday"]
            weekend = row["weekend"]

            polygon_data = json.loads(polygon)
            polygon_geometry = shape(polygon_data)

            # Create Locations objects for bulk_create
            values.append(
                NoisePolygons(
                    polygon=mapping(polygon_geometry),
                    hour=hour,
                    weekday=weekday,
                    weekend=weekend,
                )
            )

        # Bulk create the Locations objects
        NoisePolygons.objects.bulk_create(values)
        end = time.time()
        print("NoisePolygons Chunk Time: " + str(end - start))

    # Read the CSV file using pandas with chunksize
    chunksize = 30000
    for df_chunk in pd.read_csv(
        "quietquestapp/quietquestapp_taxiweekdaylocations-1000000.csv",
        chunksize=chunksize,
    ):
        start = time.time()
        values = []

        for _, row in df_chunk.iterrows():
            long = row["long"]
            lat = row["lat"]
            hour = row["hour"]
            day = row["day"]
            count = row["count"]

            # Create Locations objects for bulk_create
            values.append(
                TaxiWeekdayLocations(
                    long=long, lat=lat, hour=hour, day=day, count=count
                )
            )

        # Bulk create the Locations objects
        TaxiWeekdayLocations.objects.bulk_create(values)
        end = time.time()
        print("TaxiWeekdayLocations Chunk Time: " + str(end - start))

    # Read the CSV file using pandas with chunksize
    chunksize = 30000
    for df_chunk in pd.read_csv(
        "quietquestapp/quietquestapp_taxiweekdaypolygons.csv", chunksize=chunksize
    ):
        start = time.time()
        values = []

        for _, row in df_chunk.iterrows():
            polygon = row["polygon"]
            hour = row["hour"]
            day = row["day"]

            polygon_data = json.loads(polygon)
            polygon_geometry = shape(polygon_data)

            # Create Locations objects for bulk_create
            values.append(
                TaxiWeekdayPolygons(
                    polygon=mapping(polygon_geometry), hour=hour, day=day
                )
            )

        # Bulk create the Locations objects
        TaxiWeekdayPolygons.objects.bulk_create(values)
        end = time.time()
        print("TaxiWeekdayPolygons Chunk Time: " + str(end - start))

    # # Read the CSV file using pandas with chunksize
    # chunksize = 30000
    # for df_chunk in pd.read_csv('quietquestapp/Weekend_Model_Data_NoWeather.csv', chunksize=chunksize):
    #     start = time.time()
    #     values = []
    #
    #     for _, row in df_chunk.iterrows():
    #         long = row['long']
    #         lat = row['lat']
    #         hour = row['hour']
    #         day = row['day']
    #         count = row['count']
    #
    #          # Create Locations objects for bulk_create
    #         values.append(
    #             TaxiWeekendLocations(long=long, lat=lat, hour=hour, day=day, count=count)
    #         )
    #
    #     # Bulk create the Locations objects
    #     TaxiWeekendLocations.objects.bulk_create(values)
    #     end = time.time()
    #     print("TaxiWeekendLocations Chunk Time: " + str(end - start))
    #
    # # Read the CSV file using pandas with chunksize
    # chunksize = 30000
    # for df_chunk in pd.read_csv('quietquestapp/Weekend_Model_Data_NoWeather.csv', chunksize=chunksize):
    #     start = time.time()
    #     values = []
    #
    #     for _, row in df_chunk.iterrows():
    #         polygon = row['polygon']
    #         hour = row['hour']
    #         day = row['day']
    #
    #         # Create Locations objects for bulk_create
    #         values.append(
    #             TaxiWeekendPolygons(polygon=polygon, hour=hour, day=day)
    #         )
    #
    #     # Bulk create the Locations objects
    #     TaxiWeekendPolygons.objects.bulk_create(values)
    #     end = time.time()
    #     print("TaxiWeekdayPolygons Chunk Time: " + str(end - start))
