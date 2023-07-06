# Generated by Django 4.2.2 on 2023-07-06 14:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Locations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('long', models.FloatField(default=0)),
                ('lat', models.FloatField(default=0)),
                ('hour', models.IntegerField(default=0)),
                ('weekday', models.IntegerField(default=0)),
                ('weekend', models.IntegerField(default=0)),
                ('count', models.IntegerField(default=0)),
            ],
            options={
                'verbose_name': 'locations',
            },
        ),
    ]
