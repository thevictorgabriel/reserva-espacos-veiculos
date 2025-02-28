from rest_framework import serializers
from .models import Usuario, ListaPrevia, Reserva

# Serializer para a Lista Prévia de usuários aprovados no banco de dados
class ListaPreviaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListaPrevia
        fields = ['id', 'cpf', 'siape', 'nome']

# Serializer para criação e retorno de Usuário
class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'nome', 'siape', 'email', 'cpf', 'telefone', 'password', 'aprovado']
        extra_kwargs = {
            'password': {'write_only': True},  # Senha deve ser apenas escrita
        }

    def create(self, validated_data):
        usuario = Usuario(
            nome=validated_data['nome'],
            siape=validated_data['siape'],
            email=validated_data['email'],
            cpf=validated_data['cpf'],
            telefone=validated_data['telefone'],
            aprovado=False  # Usuário não aprovado por padrão
        )
        usuario.set_password(validated_data['password'])  # Faz o hash da senha
        usuario.save()
        return usuario

# Serializer para Reservas
class ReservaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reserva
        fields = ['id', 'tipo', 'nome', 'data_inicio', 'data_fim', 'solicitante', 'status']
        read_only_fields = ['solicitante']  # O solicitante será definido automaticamente no backend
