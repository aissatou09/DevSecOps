import logging
from django.utils.timezone import now

logger = logging.getLogger(__name__)

class AuditLogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        if request.user.is_authenticated:
            user = request.user.username
        else:
            user = 'Anonymous'

        log_entry = f"[{now()}] {user} - {request.method} {request.get_full_path()} - {response.status_code}"
        
        logger.info(log_entry)

        return response
