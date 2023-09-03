import uuid


def users_profile_upload_path(instance, filename):
    date_format = instance.updated_at.strftime("%Y%m%d%H%M%S")
    undt = f"""{date_format}"""

    ext = filename.split(".")[-1]
    # get filename
    if instance.pk:
        file = f"{instance.pk}.webp"
        return 'users/{mobile}/{updt}-{newfile}'.format(mobile=instance.mobile, updt=undt, newfile=file)
    else:
        file = f"{uuid.uuid4().hex}.webp"
    return 'users/{mobile}/{newfile}'.format(mobile=instance.mobile, newfile=file)



def pagebanner_upload_path(instance, filename):
    date_format = instance.updated_at.strftime("%Y%m%d%H%M%S")
    undt = f"""{date_format}"""

    ext = filename.split(".")[-1]
    # get filename
    if instance.pk:
        file = f"{instance.pk}.webp"
    else:
        file = f"{uuid.uuid4().hex}.webp"
    return 'pagebanner/{id}/{updt}-{newfile}'.format(id=instance.id, updt=undt, newfile=file)




def pages_upload_path(instance, filename):
    date_format = instance.updated_at.strftime("%Y%m%d%H%M%S")
    undt = f"""{date_format}"""

    ext = filename.split(".")[-1]
    # get filename
    if instance.pk:
        file = f"{instance.pk}.webp"
    else:
        file = f"{uuid.uuid4().hex}.webp"
    return 'pages/{id}/{updt}-{newfile}'.format(id=instance.id, updt=undt, newfile=file)



def blogs_upload_path(instance, filename):
    date_format = instance.updated_at.strftime("%Y%m%d%H%M%S")
    undt = f"""{date_format}"""

    ext = filename.split(".")[-1]
    # get filename
    if instance.pk and instance.slug:
        file = f"{instance.pk}.webp"
        return 'blogs/{slug}/{updt}-{newfile}'.format(slug=instance.slug, updt=undt, newfile=file)
    else:
        file = f"{uuid.uuid4().hex}.webp"
        return 'blogs/{id}/{newfile}'.format(id=instance.id, updt=undt, newfile=file)



def others_upload_path(instance, filename):
    date_format = instance.updated_at.strftime("%Y%m%d%H%M%S")
    undt = f"""{date_format}"""

    ext = filename.split(".")[-1]
    # get filename
    if instance.pk:
        file = f"{instance.pk}.webp"
    else:
        file = f"{uuid.uuid4().hex}.webp"
    return 'others/{id}/{updt}-{newfile}'.format(id=instance.id, updt=undt, newfile=file)