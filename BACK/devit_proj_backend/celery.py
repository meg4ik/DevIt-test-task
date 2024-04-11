import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "devit_proj_backend.settings")
app = Celery("devit_proj_backend", broker_connection_retry_on_startup=True)
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'parse-rss-every-hour': {
        'task': 'articles.tasks.parse_and_create_articles',
        'schedule': crontab(minute=0, hour='*'),
        'args': ('https://feeds.bbci.co.uk/news/business/rss.xml',)
    },
}