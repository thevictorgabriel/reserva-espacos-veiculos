from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import ListaPrevia, Usuario
from .serializers import ListaPreviaSerializer, UsuarioSerializer, ReservaSerializer
from rest_framework import viewsets
from .models import Reserva
from rest_framework.permissions import IsAuthenticated
from .decorators import admin_required
from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bem-vindo à página inicial, aqui não existe nada...")

#Endpoint para listar todas as reservas. Somente administradores podem acessar.
@admin_required
def listar_reservas(request):
    reservas = Reserva.objects.all()
    reservas_data = list(reservas.values())
    return JsonResponse(reservas_data, safe=False)

#Endpoint para excluir uma reserva. Somente administradores podem acessar.
@admin_required
def deletar_reserva(request, reserva_id):
    
    try:
        reserva = Reserva.objects.get(id=reserva_id)
        reserva.delete()
        return JsonResponse({'detail': 'Reserva excluída com sucesso.'}, status=200)
    except Reserva.DoesNotExist:
        return JsonResponse({'detail': 'Reserva não encontrada.'}, status=404)

@api_view(['POST'])
def cadastro(request):
    if request.method == 'POST':
        # Extrair os dados do usuário da requisição
        nome = request.data.get('nome')
        siape = request.data.get('siape')
        email = request.data.get('email')
        cpf = request.data.get('cpf')
        telefone = request.data.get('telefone')
        senha = request.data.get('senha')
        status = 'pendente'
        is_admin = False  

        # Verifica se o usuário está na Lista Prévia consultando o banco de dados
        if not ListaPrevia.objects.filter(cpf=cpf, siape=siape).exists():
            return Response({"detail": "Usuário não autorizado."}, status=400)

        # Verifica se já existe um usuário cadastrado com o mesmo CPF ou SIAPE
        if Usuario.objects.filter(cpf=cpf).exists() or Usuario.objects.filter(siape=siape).exists():
            return Response({"detail": "Usuário já cadastrado."}, status=400)

        # Criar o usuário
        usuario = Usuario(
            nome=nome,
            siape=siape,
            email=email,
            cpf=cpf,
            telefone=telefone,
            status=status,
            is_admin=is_admin
        )

        # Usar o set_password para salvar a senha de forma segura
        usuario.set_password(senha)
        usuario.save()

        return Response({"detail": "Usuário cadastrado com sucesso!"}, status=201)


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    senha = request.data.get('password')

    try:
        usuario = Usuario.objects.get(email=email)

        if usuario.check_password(senha):
            if usuario.status == 'aprovado':
                return Response({"message": "Login bem-sucedido."}, status=status.HTTP_200_OK)
            elif usuario.status == 'pendente':
                return Response({"error": "Seu cadastro ainda está pendente."}, status=status.HTTP_403_FORBIDDEN)
            else:
                return Response({"error": "Seu cadastro foi reprovado."}, status=status.HTTP_403_FORBIDDEN)
        
        return Response({"error": "Credenciais inválidas."}, status=status.HTTP_401_UNAUTHORIZED)

    except Usuario.DoesNotExist:
        return Response({"error": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def listar_usuarios(request):
    usuarios = Usuario.objects.all()
    serializer = UsuarioSerializer(usuarios, many=True)
    return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def detalhe_usuario(request, pk):
    try:
        usuario = Usuario.objects.get(pk=pk)
    except Usuario.DoesNotExist:
        return Response({"error": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UsuarioSerializer(usuario, data=request.data, partial=True)
        if serializer.is_valid():
            if 'password' in request.data:
                usuario.set_password(request.data['password'])  # Hash da senha
                usuario.save()
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        usuario.delete()
        return Response({"message": "Usuário deletado com sucesso."}, status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def adicionar_lista_previa(request):
    if not request.user.is_admin:
        return Response({"error": "Apenas administradores podem adicionar usuários à Lista Prévia."}, status=status.HTTP_403_FORBIDDEN)

    serializer = ListaPreviaSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Usuário adicionado à Lista Prévia."}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def avaliar_reserva(request):
    if not request.user.is_admin:
        return Response({"error": "Apenas administradores podem avaliar reservas."}, status=status.HTTP_403_FORBIDDEN)

    reserva_id = request.data.get('id')
    acao = request.data.get('acao')  # 'aprovar' ou 'negar'

    try:
        reserva = Reserva.objects.get(id=reserva_id)
        if acao == 'aprovar':
            reserva.status = 'aprovado'
        elif acao == 'negar':
            reserva.status = 'negado'
        reserva.save()
        return Response({"message": f"Reserva {acao} com sucesso."}, status=status.HTTP_200_OK)
    except Reserva.DoesNotExist:
        return Response({"error": "Reserva não encontrada."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def avaliar_cadastro(request):
    if not request.user.is_admin:
        return Response({"error": "Apenas administradores podem avaliar cadastros."}, status=status.HTTP_403_FORBIDDEN)

    usuario_id = request.data.get('id')
    acao = request.data.get('acao')  # 'aprovar' ou 'reprovar'

    try:
        usuario = Usuario.objects.get(id=usuario_id)

        if acao == 'aprovar':
            usuario.status = 'aprovado'
            usuario.save()
            enviar_email(usuario.email, "Cadastro Aprovado", "Seu cadastro foi aprovado pelo administrador.")
            return Response({"message": "Cadastro aprovado com sucesso."}, status=status.HTTP_200_OK)

        elif acao == 'reprovar':
            usuario.status = 'reprovado'
            usuario.save()
            enviar_email(usuario.email, "Cadastro Reprovado", "Seu cadastro foi reprovado pelo administrador.")
            return Response({"message": "Cadastro reprovado com sucesso."}, status=status.HTTP_200_OK)

        return Response({"error": "Ação inválida."}, status=status.HTTP_400_BAD_REQUEST)

    except Usuario.DoesNotExist:
        return Response({"error": "Usuário não encontrado."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'PUT'])
def perfil(request):
    try:
        usuario = request.usuario
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UsuarioSerializer(usuario)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UsuarioSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)