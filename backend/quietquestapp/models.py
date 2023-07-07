from django.db import models


# Create the model to store the locations data
class Locations(models.Model):
    long = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    hour = models.IntegerField(default=0)
    weekday = models.IntegerField(default=0)
    weekend = models.IntegerField(default=0)
    count = models.IntegerField(default=0)

    # override the string method to return the lat and lng values rather than the object type
    def __str__(self):
        coordinates = str(self.lat) + "," + str(self.long) + "," + str(self.hour) + "," + str(self.weekday) + ","
        coordinates += str(self.weekend) + "," + str(self.count)
        return coordinates

    # reassign the name of the model for future use
    class Meta:
        verbose_name = "locations"
