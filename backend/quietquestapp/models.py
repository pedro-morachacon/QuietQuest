from django.db import models


# Create the model to store the noise locations data
class NoiseLocations(models.Model):
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


# Create the model to store the taxi weekday locations data
class TaxiWeekdayLocations(models.Model):
    long = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    hour = models.IntegerField(default=0)
    count = models.IntegerField(default=0)

    # override the string method to return the lat and lng values rather than the object type
    def __str__(self):
        coordinates = str(self.lat) + "," + str(self.long) + "," + str(self.hour) + "," + str(self.count)
        return coordinates

    # reassign the name of the model for future use
    class Meta:
        verbose_name = "taxi_weekday"


# Create the model to store the taxi weekend locations data
class TaxiWeekendLocations(models.Model):
    long = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    hour = models.IntegerField(default=0)
    count = models.IntegerField(default=0)

    # override the string method to return the lat and lng values rather than the object type
    def __str__(self):
        coordinates = str(self.lat) + "," + str(self.long) + "," + str(self.hour) + "," + str(self.count)
        return coordinates

    # reassign the name of the model for future use
    class Meta:
        verbose_name = "taxi_weekday"


class Accounts(models.Model):
    user = models.TextField(default="")
    password = models.TextField(default="")

    def __str__(self):
        details = str(self.user) + "," + str(self.password)
        return details

    class Meta:
        verbose_name = "accounts"


class Ratings(models.Model):
    ratings = models.IntegerField(default=0)

    # override the string method to return the lat and lng values rather than the object type
    def __str__(self):
        ratings_level = str(self.rating)
        return ratings_level

    # reassign the name of the model for future use
    class Meta:
        verbose_name = "ratings"
