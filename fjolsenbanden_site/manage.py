#!/usr/bin/env python3
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main() -> None:
    """Run administrative tasks for the Fjolsenbanden Django project."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "fjolsenbanden_site.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:  # pragma: no cover - standard Django bootstrap
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and available on your PYTHONPATH?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
