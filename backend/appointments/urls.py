from django.urls import path
from .views import AppointmentCreateView, AppointmentListView

urlpatterns = [
    path('', AppointmentListView.as_view()),
    path('create/', AppointmentCreateView.as_view()),
]
