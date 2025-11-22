"""Models for the home application."""
from django.db import models


class ContentBlock(models.Model):
    """Simple content blocks that can be rendered on the landing page."""

    TYPE_RICHTEXT = "richtext"
    TYPE_YOUTUBE = "youtube"
    TYPE_CHOICES = (
        (TYPE_RICHTEXT, "Rich text"),
        (TYPE_YOUTUBE, "YouTube"),
    )

    block_id = models.CharField(max_length=100, unique=True)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    data = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["block_id"]

    def __str__(self) -> str:
        return f"{self.block_id} ({self.type})"

    @property
    def is_richtext(self) -> bool:
        return self.type == self.TYPE_RICHTEXT

    @property
    def is_youtube(self) -> bool:
        return self.type == self.TYPE_YOUTUBE

    @property
    def html_content(self) -> str:
        return self.data.get("content", "") if isinstance(self.data, dict) else ""

    @property
    def video_id(self) -> str:
        return self.data.get("videoId", "") if isinstance(self.data, dict) else ""

    @property
    def video_src(self) -> str:
        return self.data.get("src", "") if isinstance(self.data, dict) else ""
