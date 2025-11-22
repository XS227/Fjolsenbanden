"""Models for the home application."""
from django.db import models


class ContentBlock(models.Model):
    """Simple content blocks that can be rendered on the landing page."""

    TYPE_RICHTEXT = "richtext"
    TYPE_YOUTUBE = "youtube"
    TYPE_IMAGE = "image"
    TYPE_EMAIL = "email"
    TYPE_SOCIAL = "social"
    TYPE_FAQ = "faq"
    TYPE_CHOICES = (
        (TYPE_RICHTEXT, "Rich text"),
        (TYPE_YOUTUBE, "YouTube"),
        (TYPE_IMAGE, "Image"),
        (TYPE_EMAIL, "Email"),
        (TYPE_SOCIAL, "Social link"),
        (TYPE_FAQ, "FAQ"),
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
    def is_image(self) -> bool:
        return self.type == self.TYPE_IMAGE

    @property
    def is_email(self) -> bool:
        return self.type == self.TYPE_EMAIL

    @property
    def is_social(self) -> bool:
        return self.type == self.TYPE_SOCIAL

    @property
    def is_faq(self) -> bool:
        return self.type == self.TYPE_FAQ

    @property
    def html_content(self) -> str:
        return self.data.get("content", "") if isinstance(self.data, dict) else ""

    @property
    def is_image(self) -> bool:
        return self.type == self.TYPE_IMAGE

    @property
    def is_email(self) -> bool:
        return self.type == self.TYPE_EMAIL

    @property
    def is_social(self) -> bool:
        return self.type == self.TYPE_SOCIAL

    @property
    def image_src(self) -> str:
        return self._get_data_value("src")

    @property
    def email_address(self) -> str:
        return self._get_data_value("email")

    @property
    def social_url(self) -> str:
        return self._get_data_value("url")

    @property
    def video_id(self) -> str:
        return self.data.get("videoId", "") if isinstance(self.data, dict) else ""

    @property
    def video_src(self) -> str:
        return self.data.get("src", "") if isinstance(self.data, dict) else ""

    @property
    def image_src(self) -> str:
        return self.data.get("src", "") if isinstance(self.data, dict) else ""

    @property
    def image_alt(self) -> str:
        return self.data.get("alt", "") if isinstance(self.data, dict) else ""

    @property
    def email_address(self) -> str:
        return self.data.get("email", "") if isinstance(self.data, dict) else ""

    @property
    def social_url(self) -> str:
        return self.data.get("url", "") if isinstance(self.data, dict) else ""

    @property
    def faq_question(self) -> str:
        return self.data.get("question", "") if isinstance(self.data, dict) else ""

    @property
    def faq_answer(self) -> str:
        return self.data.get("answer", "") if isinstance(self.data, dict) else ""
