from django.urls import path

from . import views

urlpatterns = [
    # onclick of the noise heatmap, call noise_heatmap_view
    path('noiseheatmap/', views.noise_heatmap_view, name="noise_heatmap"),

    # when directions are requested call directions_view
    path('directions/', views.directions_view, name='directions'),

    # onclick of the busyness heatmap, call busyness_heatmap_view
    path('busynessheatmap/', views.busyness_heatmap_view, name="busyness_heatmap"),

    path('combinedheatmap/', views.combined_heatmap_view, name="combined_heatmap"),

    path('register/', views.register_view, name="register"),

    path('login/', views.login_view, name="login"),

    path('ratings/', views.ratings_view, name="ratings"),
]
