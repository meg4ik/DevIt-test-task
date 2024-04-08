import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "devit_proj_backend.settings")
app = Celery("devit_proj_backend", broker_connection_retry_on_startup=True)
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()