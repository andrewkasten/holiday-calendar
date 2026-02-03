from django.urls import path, register_converter
from .views import AllHolidays
from .converters import IntOrStrConverter


# To use this custom converter in a URL pattern, you need to register it with Django using the register_converter function.
register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [ 
    #path('', AllStudents.as_view(), name="all_students"),
    path('<str:country>/<int:year>/', AllHolidays.as_view(), name='all_holidays') #def get(self, request, country, year) country, year is getting passed into view as a param
]
#path("<str:country>/<int:year>/", Holiday.as_view(), name='holiday')