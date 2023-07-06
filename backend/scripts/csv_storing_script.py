# script that takes all the coordinate values from the Noise_Lat_Long.csv and stores them in the database
# can ignore the warnings for the import statements if present
# run with command: python manage.py runscript test_response

from quietquestapp.models import Locations
import pandas as pd
import numpy as np
import time
import pickle


def run():
    start = time.time()

    # Delete all objects currently stored in the Locations model
    Locations.objects.all().delete()

    # Read the CSV file using pandas with chunksize
    chunksize = 30000
    for df_chunk in pd.read_csv('quietquestapp/Noise_Lat_Long.csv', chunksize=chunksize):
        start2 = time.time()

        x_vars = []
        for _, row in df_chunk.iterrows():

            lat = row['Latitude']
            long = row['Longitude']

            # Skip rows with blank values
            if pd.isnull(lat) or pd.isnull(long):
                continue

            for hour in range(0, 23):
                x_vars.append([long, lat, hour, 1, 0])
                x_vars.append([long, lat, hour, 0, 1])

        # Convert x_vars to a numpy array
        x_vars_arr = np.array(x_vars)
        df = pd.DataFrame(x_vars_arr, columns=['Longitude', 'Latitude', 'Hour', 'Weekday', 'Weekend'])

        # Load the noise model from the pickle file
        with open("quietquestapp/test_noise_model.pkl", "rb") as pickle_file:
            noise_model = pickle.load(pickle_file)

            # Make predictions using the noise model
            predictions = noise_model.predict(df)

            # Create Locations objects for bulk_create
            values = [
                Locations(long=x_var[0], lat=x_var[1], hour=x_var[2], weekday=x_var[3],
                          weekend=x_var[4], count=prediction.item())
                for x_var, prediction in zip(x_vars, predictions)
            ]

            # Bulk create the Locations objects
            Locations.objects.bulk_create(values)
            end2 = time.time()
            print("Chunk Time: " + str(end2 - start2))

    print(len(Locations.objects.all()))
    end = time.time()
    print("Total Time: " + str(end - start))
