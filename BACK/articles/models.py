from django.db import models
import uuid
from django.utils import timezone

class Article(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, blank=False, null=False, verbose_name="Title")
    link = models.URLField(blank=True, null=True, verbose_name="Resource link")
    description = models.TextField(blank=True, null=True, verbose_name="Description")
    published_date = models.DateTimeField(default=timezone.now, blank=True, null=True, verbose_name="Date of publishing")
    created_at = models.DateTimeField(auto_now_add=True)