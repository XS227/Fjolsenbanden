"""URL configuration for the home application."""
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="home"),
    path("guide/", views.guide, name="guide"),
    path("api/admin/blocks/<str:block_id>", views.admin_block, name="admin-block"),
]
