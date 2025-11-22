"""Tests for the home application."""
import json

from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from .models import ContentBlock


class HomeViewTests(TestCase):
    """Tests ensuring the homepage renders successfully with dynamic blocks."""

    def setUp(self) -> None:
        ContentBlock.objects.create(
            block_id="hero-info",
            type=ContentBlock.TYPE_RICHTEXT,
            data={"content": "<p>Tester tekstblokk</p>"},
        )
        ContentBlock.objects.create(
            block_id="hero-video",
            type=ContentBlock.TYPE_YOUTUBE,
            data={"videoId": "vid123", "src": "https://www.youtube.com/embed/vid123"},
        )

    def test_homepage_renders(self) -> None:
        response = self.client.get(reverse("home"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Spillglede for hele familien")
        self.assertContains(response, "Tester tekstblokk")
        self.assertContains(response, "https://www.youtube.com/embed/vid123")

    def test_guide_page_renders(self) -> None:
        response = self.client.get(reverse("guide"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Guide &amp; How-To")


class AdminBlockApiTests(TestCase):
    """API tests for managing content blocks."""

    def setUp(self) -> None:
        User = get_user_model()
        self.staff_user = User.objects.create_user("admin", "admin@example.com", "pass", is_staff=True)
        self.normal_user = User.objects.create_user("user", "user@example.com", "pass", is_staff=False)
        self.richtext_payload = {"type": ContentBlock.TYPE_RICHTEXT, "content": "<p>Oppdatert</p>"}
        self.youtube_payload = {
            "type": ContentBlock.TYPE_YOUTUBE,
            "videoId": "VIDEOID12345",
            "src": "https://www.youtube.com/embed/VIDEOID12345",
        }
        self.image_payload = {
            "type": ContentBlock.TYPE_IMAGE,
            "src": "https://cdn.example.com/fjolsen.jpg",
            "alt": "Fjolsen illustrasjon",
        }
        self.email_payload = {"type": ContentBlock.TYPE_EMAIL, "email": "kontakt@fjolsenbanden.no"}
        self.social_payload = {"type": ContentBlock.TYPE_SOCIAL, "url": "https://instagram.com/fjolsenbanden"}
        self.faq_payload = {
            "type": ContentBlock.TYPE_FAQ,
            "question": "Hva er FjOlsenbanden?",
            "answer": "Et trygt gaming-community for familier.",
        }

    def test_requires_staff_user(self) -> None:
        url = reverse("admin-block", args=["test-block"])
        response = self.client.put(url, data=json.dumps(self.richtext_payload), content_type="application/json")
        self.assertEqual(response.status_code, 403)
        self.assertEqual(ContentBlock.objects.count(), 0)

    def test_staff_can_update_richtext_block(self) -> None:
        url = reverse("admin-block", args=["hero-info"])
        self.client.force_login(self.staff_user)
        response = self.client.put(url, data=json.dumps(self.richtext_payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        block = ContentBlock.objects.get(block_id="hero-info")
        self.assertTrue(block.is_richtext)
        self.assertEqual(block.html_content, "<p>Oppdatert</p>")

    def test_staff_can_update_youtube_block(self) -> None:
        url = reverse("admin-block", args=["hero-video"])
        self.client.force_login(self.staff_user)
        response = self.client.put(url, data=json.dumps(self.youtube_payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        block = ContentBlock.objects.get(block_id="hero-video")
        self.assertTrue(block.is_youtube)
        self.assertEqual(block.video_id, "VIDEOID12345")
        self.assertEqual(block.video_src, "https://www.youtube.com/embed/VIDEOID12345")

    def test_staff_can_update_image_block(self) -> None:
        url = reverse("admin-block", args=["about-image"])
        self.client.force_login(self.staff_user)
        response = self.client.put(url, data=json.dumps(self.image_payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        block = ContentBlock.objects.get(block_id="about-image")
        self.assertTrue(block.is_image)
        self.assertEqual(block.image_src, "https://cdn.example.com/fjolsen.jpg")
        self.assertEqual(block.image_alt, "Fjolsen illustrasjon")

    def test_staff_can_update_email_block(self) -> None:
        url = reverse("admin-block", args=["contact-email"])
        self.client.force_login(self.staff_user)
        response = self.client.put(url, data=json.dumps(self.email_payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        block = ContentBlock.objects.get(block_id="contact-email")
        self.assertTrue(block.is_email)
        self.assertEqual(block.email_address, "kontakt@fjolsenbanden.no")

    def test_staff_can_update_social_block(self) -> None:
        url = reverse("admin-block", args=["social-instagram"])
        self.client.force_login(self.staff_user)
        response = self.client.put(url, data=json.dumps(self.social_payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        block = ContentBlock.objects.get(block_id="social-instagram")
        self.assertTrue(block.is_social)
        self.assertEqual(block.social_url, "https://instagram.com/fjolsenbanden")

    def test_staff_can_update_faq_block(self) -> None:
        url = reverse("admin-block", args=["faq-what"])
        self.client.force_login(self.staff_user)
        response = self.client.put(url, data=json.dumps(self.faq_payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        block = ContentBlock.objects.get(block_id="faq-what")
        self.assertTrue(block.is_faq)
        self.assertEqual(block.faq_question, "Hva er FjOlsenbanden?")
        self.assertEqual(block.faq_answer, "Et trygt gaming-community for familier.")

    def test_validation_errors_are_reported(self) -> None:
        url = reverse("admin-block", args=["hero-info"])
        self.client.force_login(self.staff_user)
        response = self.client.put(url, data=json.dumps({"type": "richtext"}), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContentBlock.objects.count(), 0)

    def test_invalid_email_returns_error(self) -> None:
        url = reverse("admin-block", args=["contact-email"])
        self.client.force_login(self.staff_user)
        response = self.client.post(
            url,
            data=json.dumps({"type": ContentBlock.TYPE_EMAIL, "email": "not-an-email"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContentBlock.objects.count(), 0)

    def test_invalid_social_url_returns_error(self) -> None:
        url = reverse("admin-block", args=["instagram-link"])
        self.client.force_login(self.staff_user)
        response = self.client.put(
            url,
            data=json.dumps({"type": ContentBlock.TYPE_SOCIAL, "url": "not a url"}),
            content_type="application/json",
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(ContentBlock.objects.count(), 0)
