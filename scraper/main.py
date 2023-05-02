import requests
from bs4 import BeautifulSoup
from datetime import datetime
import json
import re
import feedparser
from models.bill import Bill
from sqlalchemy.orm import Session
from db import engine


URL = "https://www.govinfo.gov/rss/bills.xml"

def fetch_data(url: str):
    return requests.get(url).content

def parse_data(data):
    items = data['items']
    objects = []
    for item in items:
        title = '-'.join(item['title'].split('-')[1:]).strip()
        description = item['description']
        url = item['link']
        image = None
        if 'image' in item:
            image = item['image']['url']
        date = None
        if 'published_parsed' in item:
            timestamp = item['published_parsed']
            date = datetime(timestamp.tm_year, timestamp.tm_mon, timestamp.tm_mday, timestamp.tm_hour, timestamp.tm_min)
            date = int(date.timestamp() / 100)

        print(description)
        # objects.append(
        #     Bill(title=title[:255], description=description, url=url, image=image, published=date)
        # )

    # with Session(engine) as session:
    #     session.add_all(objects)
    #     session.commit()

if __name__ == "__main__":
    data = feedparser.parse(URL)
    # data = feedparser.parse('bills.xml')
    parse_data(data)