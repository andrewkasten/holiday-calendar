from django.shortcuts import get_object_or_404
from rest_framework.views import APIView, Response
from django.core.serializers import serialize
import json
# from requests_oauthlib import OAuth1 # Authenticates a user with public and secret keys
from dotenv import load_dotenv # Allows us to interact with .env files
import requests # Pythons user friendly way to make requests to API's
import os # os will make it possible to grab key value pairs from .env

load_dotenv()

# Create your views here.
class AllHolidays(APIView):
    def get(self, request, country, year):
        auth = os.environ['CALENDARIFIC_API_KEY']
        endpoint = f"https://calendarific.com/api/v2/holidays?api_key={auth}&country={country}&year={year}"
        response = requests.get(endpoint)
        responseJSON = response.json()
        return Response(responseJSON)