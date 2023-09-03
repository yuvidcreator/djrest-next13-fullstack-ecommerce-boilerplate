"""
ASGI config for coreAPI project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from coreAPI.settings.base import env


# os.environ.setdefault("DJANGO_SETTINGS_MODULE", "coreAPI.settings")

if env("DEV_PHASE")=="dev":
    # print("Prodcution py set")
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coreAPI.settings.production')
else:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'coreAPI.settings.development')

application = get_asgi_application()
