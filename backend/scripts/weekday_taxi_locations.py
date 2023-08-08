# script that takes all the coordinate values from the Weekday_Model_Data_NoWeather.csv and stores them in the database
# can ignore the warnings for the import statements if present
# run with command: python manage.py runscript test_response

import pickle
import time

import numpy as np
import pandas as pd
from quietquestapp.models import TaxiWeekdayLocations


def run():
    start = time.time()

    # Delete all objects currently stored in the Locations model
    TaxiWeekdayLocations.objects.all().delete()

    # Read the CSV file using pandas with chunksize
    chunksize = 30000
    for df_chunk in pd.read_csv(
        "quietquestapp/Final_Weekday_Model_Data_NoWeather.csv", chunksize=chunksize
    ):
        start2 = time.time()

        x_vars = []
        for _, row in df_chunk.iterrows():
            lat = row["latitude"]
            long = row["longitude"]

            # Skip rows with blank values
            if pd.isnull(lat) or pd.isnull(long):
                continue

            for hour in range(0, 24):
                for day in range(0, 5):
                    x_vars.append([lat, long, hour, day])

        # Convert x_vars to a numpy array
        x_vars_arr = np.array(x_vars)
        df = pd.DataFrame(
            x_vars_arr, columns=["latitude", "longitude", "Hour", "Day of Week"]
        )

        # Load the noise model from the pickle file
        with open("quietquestapp/final_weekday_taxi_model.pkl", "rb") as pickle_file:
            weekday_model = pickle.load(pickle_file)

            # Make predictions using the noise model
            predictions = weekday_model.predict(df)

            # Create Locations objects for bulk_create
            values = [
                TaxiWeekdayLocations(
                    long=x_var[1],
                    lat=x_var[0],
                    hour=x_var[2],
                    day=x_var[3],
                    count=prediction.item(),
                )
                for x_var, prediction in zip(x_vars, predictions)
            ]

            # Bulk create the Locations objects
            TaxiWeekdayLocations.objects.bulk_create(values)
            end2 = time.time()
            print("Coordinate Chunk Time: " + str(end2 - start2))

    end = time.time()
    print("Total Time: " + str(end - start))
