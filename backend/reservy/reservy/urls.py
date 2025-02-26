from django.urls import path
from reservyApp.views import users_list, users_detail

urlpatterns = [
    path('api/users/', users_list, name='users-list'),  # For listing and creating users
    path('api/users/<int:pk>/', users_detail, name='users-detail'),  # For updating and deleting users
]