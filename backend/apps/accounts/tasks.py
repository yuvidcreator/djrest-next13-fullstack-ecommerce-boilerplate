import datetime
from .ml_model import *
# from django.utils.crypto import get_random_string


from coreAPI.celery import app

from .models import PasswordResetToken


@app.task
def delete_expired_password_reset_token_and_user_signup_token():
    expired_pwd_tokens = PasswordResetToken.objects.filter(
        created_at__lte=datetime.datetime.utcnow()
    )
    if expired_pwd_tokens.exists():
        expired_pwd_tokens.delete()
