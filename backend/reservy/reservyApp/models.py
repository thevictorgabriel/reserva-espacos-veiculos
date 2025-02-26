from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import get_user_model

# Modelo para login
class UserLogin(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)  # Armazena a senha hash

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.email

# Modelo para cadastro de usuários
class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    siape = models.CharField(max_length=10, unique=True)  # SIAPE é único para cada usuário
    email = models.EmailField(unique=True)
    cpf = models.CharField(max_length=14, unique=True)  # CPF é único para cada usuário
    senha = models.CharField(max_length=255)  # Armazena a senha hash
    telefone = models.CharField(max_length=15)

    def set_password(self, raw_password):
        self.senha = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.senha)

    def __str__(self):
        return self.nome

# Modelo para reservas
class Reserva(models.Model):
    TIPO_CHOICES = [
        ('sala', 'Sala'),
        ('veiculo', 'Veículo'),
    ]

    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    nome = models.CharField(max_length=100)  # Nome da sala ou veículo (ex: Picape 50 UZ)
    data_inicio = models.DateTimeField()  # Data e hora de início da reserva
    data_fim = models.DateTimeField()  # Data e hora de término da reserva
    solicitante = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  # Usuário que fez a reserva

    def __str__(self):
        return f"{self.nome} - {self.solicitante.nome} ({self.data_inicio} até {self.data_fim})"