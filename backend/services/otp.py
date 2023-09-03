# from django.utils.crypto import get_random_string
# from coreAPI.dependancies import thread
# from django.conf import settings
from coreAPI.settings.base import SMS
from twilio.rest import Client

# from twilio.base.exceptions import TwilioRestException


def send_twilio_sms(msg_to: str, msg_otp: str) -> str:
    client = Client(SMS["account_sid"], SMS["auth_token"])
    # client = Client(account_sid, auth_token)
    message = client.messages.create(
        body=f"OTP From Gau Srushti - {msg_otp}",
        from_=SMS["from_number"],
        to=f"+91{msg_to}",
    )
    print(message.sid)
    return message
    # try:
    #     message = client.messages.create(
    #         body=f"Login OTP for The Testing {msg_otp}",
    #         from_=settings.SMS["from_number"],
    #         to=f"+91{msg_to}",
    #     )
    #     # print(message.sid)
    #     return message
    # except TwilioRestException as e:
    #     print(e)
