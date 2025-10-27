"""Project level URL routing for the Fjolsenbanden site."""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("home.urls")),
]
