"""Admin registrations for the home app."""
from django.contrib import admin

from .models import ContentBlock


@admin.register(ContentBlock)
class ContentBlockAdmin(admin.ModelAdmin):
    list_display = ("block_id", "type", "updated_at")
    search_fields = ("block_id",)
    list_filter = ("type",)
    ordering = ("block_id",)
