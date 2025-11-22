from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("home", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contentblock",
            name="type",
            field=models.CharField(
                choices=[
                    ("richtext", "Rich text"),
                    ("youtube", "YouTube"),
                    ("image", "Image"),
                    ("email", "Email"),
                    ("social", "Social link"),
                    ("faq", "FAQ"),
                ],
                max_length=20,
            ),
        ),
    ]
