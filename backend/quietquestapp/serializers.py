from rest_framework import serializers

# serializer that converts the queryset data into data that can be converted to JSON
class LocationsSerializer(serializers.Serializer):
    lat = serializers.FloatField()
    long = serializers.FloatField()
