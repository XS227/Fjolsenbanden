"""Tests for the home application."""
from django.test import SimpleTestCase
from django.urls import reverse


class HomeViewTests(SimpleTestCase):
    """Basic tests ensuring the homepage renders successfully."""

    def test_homepage_renders(self) -> None:
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Welcome to Fjølsenbanden")
