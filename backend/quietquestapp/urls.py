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

    path("", views.front_page, name="front_page"),

    path("firebaseauth", views.firebaseauth_page, name="firebaseauth_page"),

    path("accountpage", views.account_page, name="account_page"),

    path("contact", views.contact_page, name="contact_page"),

    path("feedback", views.feedback_page, name="feedback_page"),

    path("rating", views.rating_page, name="rating_page"),

    path("resetpwd", views.resetpwd_page, name="resetpwd_page"),

    path("saveLinkIcon", views.save_link_icon_page, name="save_link_icon_page"),

    path("weather", views.weather_page, name="weather_page"),

    path("404", views.error_page, name="error_page"),
]
