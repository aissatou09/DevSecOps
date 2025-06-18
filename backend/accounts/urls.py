from django.urls import path
from .views import RegisterView, UserListView, current_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
#from .views import AppointmentCreateView, AppointmentListView
from .views import list_dentists

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    path('me/', current_user, name='current_user'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dentists/', list_dentists),
 #   path('', AppointmentListView.as_view()),
#    path('create/', AppointmentCreateView.as_view()),
]

