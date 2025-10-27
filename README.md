# Fjølsenbanden Django Site

This repository now contains a Django project located in [`fjolsenbanden_site/`](fjolsenbanden_site/)
that replaces the previous PHP-based implementation. The project provides a simple landing page
that you can extend with additional views and applications.

## Getting Started

1. Create and activate a virtual environment:
   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```
2. Install dependencies:
   ```bash
   pip install -r fjolsenbanden_site/requirements.txt
   ```
3. Apply migrations and run the development server:
   ```bash
   python fjolsenbanden_site/manage.py migrate
   python fjolsenbanden_site/manage.py runserver
   ```
4. Visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to see the homepage.

## Running Tests

```bash
python fjolsenbanden_site/manage.py test
```

The included test ensures the homepage renders successfully.
