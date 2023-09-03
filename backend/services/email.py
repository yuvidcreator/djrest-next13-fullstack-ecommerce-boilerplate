from django.conf import settings
from django.core import mail
# from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


# @app.task
def send_email(subject: str, body: str, to_email: str) -> None:
    mail.send_mail(subject, body, settings.EMAIL_FROM, [to_email])


# @app.task
def send_html_mail(subject, template, email_to, data: dict = {}):
    html_message = render_to_string(template, data)
    plain_message = strip_tags(html_message)
    # print(subject)
    mail.send_mail(
        subject,
        plain_message,
        settings.EMAIL_FROM,
        [email_to],
        html_message=html_message,
    )
