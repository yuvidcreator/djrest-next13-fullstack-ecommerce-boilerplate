import base64
import json
import os
from threading import Thread
from uuid import uuid4

import requests as req
from django.conf import settings


def path_and_rename(instance, filename):
    upload_to = "mediafiles"
    ext = filename.split(".")[-1]
    # get filename
    if instance.pk:
        filename = f"{instance.pk}.{ext}"
    else:
        # set filename as random string
        filename = f"{uuid4().hex}.{ext}"
    # return the whole path to the file
    return os.path.join(upload_to, filename)


def thread(fun):
    def wrapper(*args, **kwargs):
        Thread(target=fun, args=args, kwargs=kwargs).start()

    return wrapper
