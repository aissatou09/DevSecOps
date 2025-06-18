import logging
from rest_framework import generics, permissions
from .models import CustomUser
from .serializers import RegisterSerializer, UserSerializer

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
