import logging
from rest_framework import generics, permissions, viewsets
from .models import CustomUser
from .serializers import RegisterSerializer, UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Appointment
from .serializers import AppointmentSerializer

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    """
    Vue API pour enregistrer un nouvel utilisateur.
    Accessible sans authentification.
    """
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        logger.info(f"Nouvel utilisateur enregistré : {user.username} ({user.role})")


class UserListView(generics.ListAPIView):
    """
    Vue API pour lister les utilisateurs.
    Accessible uniquement aux utilisateurs authentifiés.
    """
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_dentists(request):
    dentists = CustomUser.objects.filter(role='dentist')
    serializer = UserSerializer(dentists, many=True)
    return Response(serializer.data)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(data['password'])  # hash du password
            user.save()
            return Response({"message": "Inscription réussie"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        role = self.request.query_params.get('role')
        if role:
            return self.queryset.filter(role=role)
        return self.queryset.none()

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'assistant':
            return Appointment.objects.all()
        if user.role == 'dentist':
            return Appointment.objects.filter(dentist=user)
        if user.role == 'patient':
            return Appointment.objects.filter(patient=user)
        return Appointment.objects.none()
