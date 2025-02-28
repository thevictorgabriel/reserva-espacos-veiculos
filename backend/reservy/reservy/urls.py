from django.urls import path
from django.contrib import admin
from reservyApp.views import perfil, home
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from reservyApp.views import (
    listar_usuarios, detalhe_usuario, cadastro, login, adicionar_lista_previa, avaliar_reserva
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),  # Página inicial

    # Endpoints da API
    path('api/usuarios/', listar_usuarios, name='listar_usuarios'),
    path('api/usuarios/<int:pk>/', detalhe_usuario, name='detalhe_usuario'),
    path('api/cadastro/', cadastro, name='cadastro'),
    path('api/login/', login, name='login'),

    # Administração de cadastros e reservas
    path('api/lista_previa/adicionar/', adicionar_lista_previa, name='adicionar_lista_previa'),
    path('api/reservas/avaliar/', avaliar_reserva, name='avaliar_reserva'),
    
    # Endpoints para autenticação JWT
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Endpoint para perfil de usuario
    path('api/perfil/', perfil, name='perfil'),
]
