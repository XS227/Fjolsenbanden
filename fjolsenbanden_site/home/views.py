"""Views for the Fjolsenbanden landing page."""
import json
from http import HTTPStatus

from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import ContentBlock


def _block_payload_is_valid(payload):
    block_type = payload.get("type")
    if block_type not in (ContentBlock.TYPE_RICHTEXT, ContentBlock.TYPE_YOUTUBE):
        return False, "Ukjent eller manglende blokk-type"

    if block_type == ContentBlock.TYPE_RICHTEXT:
        content = payload.get("content")
        if not isinstance(content, str) or not content.strip():
            return False, "Richtext-blokker krever feltet 'content'"
        return True, {"type": block_type, "data": {"content": content}}

    video_id = payload.get("videoId")
    src = payload.get("src")
    if not isinstance(video_id, str) or not video_id.strip():
        return False, "YouTube-blokker krever feltet 'videoId'"
    if not isinstance(src, str) or not src.strip():
        return False, "YouTube-blokker krever feltet 'src'"
    return True, {"type": block_type, "data": {"videoId": video_id, "src": src}}


@csrf_exempt
@require_http_methods(["PUT"])
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
