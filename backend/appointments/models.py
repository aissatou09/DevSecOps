from django.db import models
from django.conf import settings

class Appointment(models.Model):
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='patient_appointments'
    )
    dentist = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='dentist_appointments'
    )
    date = models.DateTimeField()
    description = models.TextField(blank=True)

    def __str__(self):
        return f"RDV de {self.patient.username} avec {self.dentist.username} le {self.date}"
