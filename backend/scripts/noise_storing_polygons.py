# script that takes all the coordinate values from the Noise_Model_Data_WD_WE.csv and stores them in the database
# can ignore the warnings for the import statements if present
# run with command: python manage.py runscript test_response

import pickle
import time

import numpy as np
import pandas as pd
from pyproj import Transformer
from quietquestapp.models import NoisePolygons
from shapely import affinity
from shapely.geometry import Point, Polygon, mapping


def run():
    start = time.time()

    def create_buffer_polygon(point_in, resolution=10, radius=100):
        transformer_wgs84_to_utm32n = Transformer.from_crs("EPSG:4326", "EPSG:3857")
        transformer_utm32n_to_wgs84 = Transformer.from_crs("EPSG:3857", "EPSG:4326")
        point_in_proj = transformer_wgs84_to_utm32n.transform(*point_in)
        point_buffer_proj = Point(point_in_proj).buffer(radius, resolution=resolution)

        # Adjust the aspect ratio of the buffer
        transformed_buffer = affinity.scale(point_buffer_proj, xfact=1, yfact=5)

        # Transform back to WGS84
        poly_wgs = [
            transformer_utm32n_to_wgs84.transform(*point)
            for point in transformed_buffer.exterior.coords
        ]
        return poly_wgs

    def merge_intersecting_polygons(poly_list):
        merged_polygons = []
        for poly in poly_list:
            if not merged_polygons:
                merged_polygons.append(poly)
            else:
                new_merged = []
                for merged_poly in merged_polygons:
                    if poly.intersects(merged_poly):
                        poly = poly.union(merged_poly)
                    else:
                        new_merged.append(merged_poly)
                new_merged.append(poly)
                merged_polygons = new_merged
        return merged_polygons

    # Delete all objects currently stored in the polygons model
    NoisePolygons.objects.all().delete()

    # Read the CSV file using pandas with chunksize
    chunksize = 30000

    for df_chunk in pd.read_csv(
        "quietquestapp/Final_Noise_Crime_Model_Data_WD_WE.csv", chunksize=chunksize
    ):
        start2 = time.time()

        x_vars = []
        pred_outputs = []
        for _, row in df_chunk.iterrows():
            lat = row["Latitude"]
            long = row["Longitude"]

            # Skip rows with blank values
            if pd.isnull(lat) or pd.isnull(long):
                continue

            for hour in range(0, 24):
                x_vars.append([lat, long, hour, 1, 0])
                x_vars.append([lat, long, hour, 0, 1])

        # Convert x_vars to a numpy array
        x_vars_arr = np.array(x_vars)
        df = pd.DataFrame(
            x_vars_arr, columns=["Latitude", "Longitude", "Hour", "Weekend", "Weekday"]
        )

        # Load the noise model from the pickle file
        with open("quietquestapp/finalised_crime_noise_model.pkl", "rb") as pickle_file:
            noise_model = pickle.load(pickle_file)

            # Make predictions using the noise model
            predictions = noise_model.predict(df)
            pred_outputs.extend(predictions)

            df["Count"] = pred_outputs

            end2 = time.time()
            print("Coordinate Chunk Time: " + str(end2 - start2))

    df_high_count = df[df["Count"] >= 0.5]

    for hour in range(0, 24):
        start3 = time.time()

        locations_weekday = list(
            df_high_count[
                (df_high_count["hour"] == int(hour)) & (df_high_count["weekday"] == 1)
            ]
        )

        high_index_value_ls_weekday = []
        for location in locations_weekday:
            point_buffer = Polygon(create_buffer_polygon((location[1], location[0])))
            high_index_value_ls_weekday.append(point_buffer)

        intersecting_polygons_weekday = merge_intersecting_polygons(
            high_index_value_ls_weekday
        )

        polygons_weekday = [
            NoisePolygons(polygon=mapping(polygon), hour=hour, weekday=1, weekend=0)
            for polygon in intersecting_polygons_weekday
        ]

        NoisePolygons.objects.bulk_create(polygons_weekday)

        # Get predicted locations for the specific hour and day
        locations_weekend = list(
            df_high_count[
                (df_high_count["hour"] == int(hour)) & (df_high_count["weekend"] == 1)
            ]
        )

        high_index_value_ls_weekend = []
        for location in locations_weekend:
            point_buffer = Polygon(create_buffer_polygon((location[1], location[0])))
            high_index_value_ls_weekend.append(point_buffer)

        intersecting_polygons_weekend = merge_intersecting_polygons(
            high_index_value_ls_weekend
        )

        polygons_weekend = [
            NoisePolygons(polygon=mapping(polygon), hour=hour, weekday=0, weekend=1)
            for polygon in intersecting_polygons_weekend
        ]

        NoisePolygons.objects.bulk_create(polygons_weekend)

        end3 = time.time()
        print("Polygon Chunk Time: " + str(end3 - start3))

    end = time.time()
    print("Total Time: " + str(end - start))
