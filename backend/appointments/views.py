#from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .models import Appointment
from .serializers import AppointmentSerializer
import logging

audit_logger = logging.getLogger('audit')

class AppointmentCreateView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        appointment = serializer.save()
        audit_logger.info(
            f"{self.request.user.username} a créé un RDV avec {appointment.dentist.username} le {appointment.date}"
        )


class AppointmentListView(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Appointment.objects.all()
        elif user.role == 'dentist':
            return Appointment.objects.filter(dentist=user)
        else:
            return Appointment.objects.filter(patient=user)
