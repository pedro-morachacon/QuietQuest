# script that takes all the coordinate values from the Noise_Lat_Long.csv and stores them in the database
# can ignore the warnings for the import statements if present
# run with command: python manage.py runscript test_response

from quietquestapp.models import Locations
import csv


def run():
    with open('quietquestapp/Noise_Lat_Long.csv') as file:
        reader = csv.reader(file)
        next(reader)  # Advance past the header

        # delete all objects currently stored in the Locations model
        Locations.objects.all().delete()

        for row in reader:
            # some rows contain blank values, this skips that row if that is the case
            if row[1] == "" or row[2] == "":
                next(reader)
            else:
                # store the coordinates
                coordinates = Locations.objects.create(long=row[2], lat=row[1])

            # save the coordinates to the database
            coordinates.save()
