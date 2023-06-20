from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('directions/', views.directions_view, name='directions'),
]
