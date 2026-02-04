
docker compose up -d --build

# make sure the postgres container is ready, then run migrations
sleep 5
# docker exec  python /src/manage.py makemigrations calendar_app
# docker exec django-app-w13d3-api-1 python /src/manage.py migrate
