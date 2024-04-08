from django.db import models
import uuid

class Article(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255, blank=False, null=False, verbose_name="Title")
    link = models.URLField(blank=False, null=False, verbose_name="Resource link")
    description = models.TextField(blank=False, null=False, verbose_name="Description")
    published_date = models.DateTimeField(blank=False, null=False, verbose_name="Date of publishing")
    media_link = models.URLField(blank=False, null=False, verbose_name="Picture link")
    created_at = models.DateTimeField(auto_now_add=True)