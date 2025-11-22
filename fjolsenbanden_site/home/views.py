"""Views for the Fjolsenbanden landing page."""
import json
from http import HTTPStatus

from django.core.exceptions import ValidationError
from django.core.validators import URLValidator, validate_email
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator

from .models import ContentBlock

_EMAIL_VALIDATOR = EmailValidator()


def _block_payload_is_valid(payload):
    block_type = payload.get("type")

    validators = {
        ContentBlock.TYPE_RICHTEXT: _validate_richtext_payload,
        ContentBlock.TYPE_YOUTUBE: _validate_youtube_payload,
        ContentBlock.TYPE_IMAGE: _validate_image_payload,
        ContentBlock.TYPE_EMAIL: _validate_email_payload,
        ContentBlock.TYPE_SOCIAL: _validate_social_payload,
    }

    validator = validators.get(block_type)
    if not validator:
        return False, "Ukjent eller manglende blokk-type"

    return validator(payload)


def _validate_richtext_payload(payload):
    content = payload.get("content")
    if not isinstance(content, str) or not content.strip():
        return False, "Richtext-blokker krever feltet 'content'"
    return True, {"type": ContentBlock.TYPE_RICHTEXT, "data": {"content": content}}


def _validate_youtube_payload(payload):
    video_id = payload.get("videoId")
    src = payload.get("src")
    if not isinstance(video_id, str) or not video_id.strip():
        return False, "YouTube-blokker krever feltet 'videoId'"
    if not isinstance(src, str) or not src.strip():
        return False, "YouTube-blokker krever feltet 'src'"
    return True, {"type": ContentBlock.TYPE_YOUTUBE, "data": {"videoId": video_id, "src": src}}


def _validate_image_payload(payload):
    src = payload.get("src")
    if not isinstance(src, str) or not src.strip():
        return False, "Bilde-blokker krever feltet 'src'"
    return True, {"type": ContentBlock.TYPE_IMAGE, "data": {"src": src}}


def _validate_email_payload(payload):
    email = payload.get("email")
    if not isinstance(email, str) or not email.strip():
        return False, "E-post-blokker krever feltet 'email'"
    try:
        validate_email(email)
    except ValidationError:
        return False, "E-post-blokker krever et gyldig felt 'email'"
    return True, {"type": ContentBlock.TYPE_EMAIL, "data": {"email": email}}


def _validate_social_payload(payload):
    url = payload.get("url")
    if not isinstance(url, str) or not url.strip():
        return False, "Sosial-blokker krever feltet 'url'"
    validator = URLValidator()
    try:
        validator(url)
    except ValidationError:
        return False, "Sosial-blokker krever en gyldig 'url'"
    return True, {"type": ContentBlock.TYPE_SOCIAL, "data": {"url": url}}


@csrf_exempt
@require_http_methods(["PUT", "POST"])
def admin_block(request, block_id):
    """Create or update a content block for administrators."""

    if not request.user.is_authenticated or not request.user.is_staff:
        return JsonResponse({"error": "Kun administratorer kan oppdatere blokker"}, status=HTTPStatus.FORBIDDEN)

    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"error": "Ugyldig JSON i forespørselen"}, status=HTTPStatus.BAD_REQUEST)

    ok, result = _block_payload_is_valid(payload)
    if not ok:
        return JsonResponse({"error": result}, status=HTTPStatus.BAD_REQUEST)

    block, _created = ContentBlock.objects.get_or_create(block_id=block_id)
    block.type = result["type"]
    block.data = result["data"]
    block.save()

    return JsonResponse(
        {
            "id": block.block_id,
            "type": block.type,
            "data": block.data,
            "updated_at": block.updated_at,
        },
        status=HTTPStatus.OK,
    )


def index(request):
    """Render the homepage template."""
    blocks = {block.block_id: block for block in ContentBlock.objects.all()}
    return render(
        request,
        "home/index.html",
        {
            "blocks": blocks,
            "hero_info_block": blocks.get("hero-info"),
            "hero_video_block": blocks.get("hero-video"),
        },
    )


def guide(request):
    """Render the project guide/how-to page."""
    return render(request, "home/guide.html")
