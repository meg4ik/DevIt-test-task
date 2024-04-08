from celery import shared_task
import feedparser
from .models import Article
from datetime import datetime

@shared_task
def parse_and_create_articles(rss_url):
    feed = feedparser.parse(rss_url)
    for entry in feed.entries:
        title = entry.get('title', '')
        link = entry.get('link', '')
        description = entry.get('description', '')
        published_date = datetime.strptime(entry.get('pubDate', ''), '%a, %d %b %Y %H:%M:%S %Z')
        media_link = entry.get('media:thumbnail', [{'url': ''}])[0]['url']

        Article.objects.create(
            title=title,
            link=link,
            description=description,
            published_date=published_date,
            media_link=media_link
        )