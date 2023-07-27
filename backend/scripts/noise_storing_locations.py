# script that takes all the coordinate values from the Noise_Model_Data_WD_WE.csv and stores them in the database
# can ignore the warnings for the import statements if present
# run with command: python manage.py runscript test_response

from quietquestapp.models import NoiseLocations
import pandas as pd
import numpy as np
import time
import pickle


def run():
    start = time.time()

    # Delete all objects currently stored in the Locations model
    NoiseLocations.objects.all().delete()

    # Read the CSV file using pandas with chunksize
    chunksize = 30000

    for df_chunk in pd.read_csv('quietquestapp/Final_Noise_Model_Data_WD_WE.csv', chunksize=chunksize):
        start2 = time.time()

        x_vars = []
        for _, row in df_chunk.iterrows():

            lat = row['Latitude']
            long = row['Longitude']

            # Skip rows with blank values
            if pd.isnull(lat) or pd.isnull(long):
                continue

            for hour in range(0, 24):
                x_vars.append([lat, long, hour, 1, 0])
                x_vars.append([lat, long, hour, 0, 1])

        # Convert x_vars to a numpy array
        x_vars_arr = np.array(x_vars)
        df = pd.DataFrame(x_vars_arr, columns=['Latitude', 'Longitude', 'Hour', 'Weekend', 'Weekday'])

        # Load the noise model from the pickle file
        with open("quietquestapp/finalised_noise_model.pkl", "rb") as pickle_file:
            noise_model = pickle.load(pickle_file)

            # Make predictions using the noise model
            predictions = noise_model.predict(df)

            # Create Locations objects for bulk_create
            values = [
                NoiseLocations(long=x_var[1], lat=x_var[0], hour=x_var[2], weekday=x_var[4],
                               weekend=x_var[3], count=prediction.item())
                for x_var, prediction in zip(x_vars, predictions)
            ]

            # Bulk create the Locations objects
            NoiseLocations.objects.bulk_create(values)
            end2 = time.time()
            print("Coordinate Chunk Time: " + str(end2 - start2))

    end = time.time()
    print("Total Time: " + str(end - start))
