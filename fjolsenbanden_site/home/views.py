"""Views for the Fjolsenbanden landing page."""
from django.shortcuts import render


def index(request):
    """Render the homepage template."""
    return render(request, "home/index.html")
