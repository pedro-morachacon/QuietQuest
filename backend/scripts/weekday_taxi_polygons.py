# script that takes all the coordinate values from the Weekday_Model_Data_NoWeather.csv and stores them in the database
# can ignore the warnings for the import statements if present
# run with command: python manage.py runscript test_response

from quietquestapp.models import TaxiWeekdayPolygons
import pandas as pd
import numpy as np
import time
import pickle
from pyproj import Transformer
from shapely.geometry import Polygon, mapping, Point
from shapely import affinity


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
        poly_wgs = [transformer_utm32n_to_wgs84.transform(*point) for point in transformed_buffer.exterior.coords]
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
    TaxiWeekdayPolygons.objects.all().delete()

    # Read the CSV file using pandas with chunksize
    chunksize = 30000
    for df_chunk in pd.read_csv('quietquestapp/Final_Weekday_Model_Data_NoWeather_Crime.csv', chunksize=chunksize):
        start2 = time.time()

        x_vars = []
        pred_outputs = []
        for _, row in df_chunk.iterrows():

            lat = row['latitude']
            long = row['longitude']

            # Skip rows with blank values
            if pd.isnull(lat) or pd.isnull(long):
                continue

            for hour in range(0, 24):
                for day in range(0, 5):
                    x_vars.append([lat, long, hour, day])

        # Convert x_vars to a numpy array
        x_vars_arr = np.array(x_vars)
        df = pd.DataFrame(x_vars_arr, columns=['latitude', 'longitude', 'Hour', 'Day of Week'])

        # Load the noise model from the pickle file
        with open("quietquestapp/final_crime_weekday_taxi_model.pkl", "rb") as pickle_file:
            weekday_model = pickle.load(pickle_file)

            # Make predictions using the noise model
            predictions = weekday_model.predict(df)
            pred_outputs.extend(predictions)

            df['Count'] = pred_outputs

            end2 = time.time()
            print("Coordinate Chunk Time: " + str(end2 - start2))

    df_high_count = df[df["Count"] >= 0.7]

    for hour in range(0, 24):
        for day in range(0, 5):
            start3 = time.time()
            locations = list(df_high_count[(df_high_count["Hour"] == hour) & (df_high_count["Day of Week"] == day)]
                             .values)

            high_index_value_ls = []
            for location in locations:
                point_buffer = Polygon(create_buffer_polygon((location[1], location[0])))
                high_index_value_ls.append(point_buffer)

            intersecting_polygons = merge_intersecting_polygons(high_index_value_ls)

            polygons = [
                TaxiWeekdayPolygons(polygon=mapping(polygon), hour=hour, day=day)
                for polygon in intersecting_polygons
            ]

            TaxiWeekdayPolygons.objects.bulk_create(polygons)

            end3 = time.time()
            print("Polygon Chunk Time: " + str(end3 - start3))

    end = time.time()
    print("Total Time: " + str(end - start))

