from celery import shared_task
import feedparser
from .models import Article
from datetime import datetime
import time

@shared_task
def parse_and_create_articles(rss_url):
    feed = feedparser.parse(rss_url)
    for entry in feed.entries:
        title = entry.get('title', '')
        link = entry.get('link', '')
        description = entry.get('description', '')
        published_date_parsed = entry.get('published_parsed')
        media_link = entry.get('media:thumbnail', [{'url': ''}])[0]['url']

        if published_date_parsed:
            try:
                published_date = datetime.fromtimestamp(time.mktime(published_date_parsed))
                Article.objects.create(
                    title=title,
                    link=link,
                    description=description,
                    published_date=published_date,
                    media_link=media_link
                )
            except:
                continue
