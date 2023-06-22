from django.urls import path

from . import views

urlpatterns = [
    # onload of the home page call the locations_view
    path("", views.locations_view, name="locations"),

    # when directions are requested call directions_view
    path('directions/', views.directions_view, name='directions'),
]
