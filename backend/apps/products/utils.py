import uuid


def product_images_upload_path(instance, filename):
    date_format = instance.updated_at.strftime("%Y%m%d%H%M%S")
    undt = f"""{date_format}"""

    ext = filename.split(".")[-1]
    # get filename
    if instance.pk:
        # file = f"{instance.pk}.{ext}"
        file = f"{instance.pk}.webp"
    else:
        # set filename as random string
        # file = f"{uuid.uuid4().hex}.{ext}"
        file = f"{uuid.uuid4().hex}.webp"
    return 'product_{id}/{newfile}'.format(id=instance.id, newfile=file)
