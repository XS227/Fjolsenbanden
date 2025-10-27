"""Configuration for the home application."""
from django.apps import AppConfig


class HomeConfig(AppConfig):
    """Application configuration for the landing page."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "home"
