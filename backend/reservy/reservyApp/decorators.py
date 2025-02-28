from django.http import JsonResponse
from functools import wraps

def admin_required(view_func):
    
    @wraps(view_func)
    def _wrapped_view(request, *args, **kwargs):
        # Verifica se o usuário está autenticado e é admin
        if request.user.is_authenticated and request.user.is_staff:
            return view_func(request, *args, **kwargs)
        else:
            return JsonResponse({'detail': 'Acesso negado. Somente administradores podem acessar este recurso.'}, status=403)
    
    return _wrapped_view