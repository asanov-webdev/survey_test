# Generated by Django 3.0.5 on 2020-04-08 20:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tests', '0014_auto_20191226_1747'),
    ]

    operations = [
        migrations.AlterField(
            model_name='testresult',
            name='finishTime',
            field=models.DateTimeField(default=datetime.datetime(2020, 4, 8, 23, 48, 29, 679732)),
        ),
    ]