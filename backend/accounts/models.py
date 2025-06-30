from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class CustomUser(AbstractUser):
    ROLE_CHOICES = [
        ('admin', 'Administrateur'),
        ('dentist', 'Dentiste'),
        ('assistant', 'Assistant'),
        ('patient', 'Patient'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.username} ({self.role})"

class Appointment(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments_as_patient')
    dentist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments_as_dentist')
    date = models.DateTimeField()
    motif = models.CharField(max_length=255)

    def __str__(self):
        return f"RDV {self.patient} avec {self.dentist} le {self.date.strftime('%d/%m %H:%M')}"
