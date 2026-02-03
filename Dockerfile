FROM python:3.12-slim

WORKDIR /src

COPY . .

RUN pip install -r requirements.txt

CMD gunicorn --bind 0.0.0.0:8000 --workers 3 apicalendar.wsgi:application