from django.db import models


# Create the model to store the locations data
class Locations(models.Model):
    lat = models.FloatField()
    long = models.FloatField()

    # override the string method to return the lat and lng values rather than the object type
    def __str__(self):
        coordinates = str(self.lat) + "," + str(self.long)
        return coordinates

    # reassign the name of the model for future use
    class Meta:
        verbose_name = "locations"
