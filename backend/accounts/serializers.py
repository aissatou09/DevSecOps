from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour afficher les utilisateurs (sans mot de passe)
    """
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour enregistrer un nouvel utilisateur
    - Demande un mot de passe et sa confirmation
    - Valide le mot de passe avec les règles Django
    """
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'role', 'password', 'password2']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Les mots de passe ne correspondent pas."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            role=validated_data['role'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
