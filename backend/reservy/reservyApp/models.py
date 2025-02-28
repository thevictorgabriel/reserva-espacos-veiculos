from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.models import User

# Modelo de Usuário customizado (herda do sistema de autenticação do Django)
class Usuario(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aprovado', 'Aprovado'),
        ('reprovado', 'Reprovado'),
    ]

    nome = models.CharField(max_length=100)
    siape = models.CharField(max_length=10, unique=True)
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=14, unique=True)
    senha = models.CharField(max_length=255)
    telefone = models.CharField(max_length=15)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')
    is_admin = models.BooleanField(default=False)

    def set_password(self, raw_password):
        self.senha = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.senha)


# Lista prévia de usuários autorizados a se cadastrar automaticamente
class ListaPrevia(models.Model):
    cpf = models.CharField(max_length=14, unique=True)
    siape = models.CharField(max_length=10, unique=True)
    nome = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.nome} - {self.cpf}"

# Defina a constante TIPO_CHOICES
TIPO_CHOICES = [
    ('espaco', 'Espaço'),
    ('veiculo', 'Veículo'),
]

# Modelo de reservas
class Reserva(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('aprovado', 'Aprovado'),
        ('negado', 'Negado'),
    ]

    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    nome = models.CharField(max_length=100)
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    solicitante = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pendente')  # Novo status

    def __str__(self):
        return f"{self.nome} - {self.solicitante.nome} ({self.status})"
