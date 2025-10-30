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

## Deployment Tips

For a lightweight production setup you can run the Django project with Gunicorn behind a reverse proxy such as Nginx.

1. Install the Python dependencies and run database migrations on the target server:
   ```bash
   pip install -r fjolsenbanden_site/requirements.txt
   python fjolsenbanden_site/manage.py migrate
   ```
2. Start Gunicorn pointing at the WSGI application:
   ```bash
   gunicorn --chdir fjolsenbanden_site fjolsenbanden_site.wsgi:application
   ```
3. Configure your proxy (e.g. Nginx) to forward traffic from ports 80/443 to the Gunicorn socket/port and make sure
   environment variables such as `DJANGO_SECRET_KEY` and `DJANGO_ALLOWED_HOSTS` are set.

Remember to collect static files for production deployments:

```bash
python fjolsenbanden_site/manage.py collectstatic
```

## Running Tests

```bash
python fjolsenbanden_site/manage.py test
```

The included test ensures the homepage renders successfully.
