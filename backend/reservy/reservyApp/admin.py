# admin.py
from django.contrib import admin
from .models import Usuario, Reserva, ListaPrevia  # Remova UserLogin

# Register your models here.
# admin.site.register(UserLogin)  # Remova esta linha
admin.site.register(Usuario)
admin.site.register(Reserva)
admin.site.register(ListaPrevia)

#admin
#admin@email.com
#adm123456