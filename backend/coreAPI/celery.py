from __future__ import absolute_import
import os

from celery import Celery
from celery.schedules import crontab

from coreAPI.settings import base



# Set the default Django settings module for the 'celery' program.
if base.env("DEV_PHASE")=="prod":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "coreAPI.settings.production")
else:
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "coreAPI.settings.development")

app = Celery("coreAPI")
app.conf.enable_utc = True


app.conf.beat_schedule = {
    # Executes every Monday morning at 7:30 a.m.
    "delete-expired-reset-token-at-evry-midnight": {
        "task": "accounts.tasks.delete_expired_password_reset_token_and_user_signup_token",
        "schedule": crontab(hour=0, minute=0),
    }
}

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
if base.env("DEV_PHASE")=="prod":
    app.config_from_object("coreAPI.settings.production", namespace="CELERY")
else:
    app.config_from_object("coreAPI.settings.development", namespace="CELERY")

# Load task modules from all registered Django apps.
app.autodiscover_tasks(lambda: base.INSTALLED_APPS)



@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")
