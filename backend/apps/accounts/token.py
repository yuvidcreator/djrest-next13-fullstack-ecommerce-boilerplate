# import datetime
# from typing import List

import jwt
from django.conf import settings


class JWT:
    def encode_jwt_token(self, payload: dict) -> str:
        """
        ### Encode JWT Token
        """
        return jwt.encode(payload, settings.SECRET_KEY, algorithm="HS256")

    def decode_jwt_token(self, token: str) -> bool:
        """
        ### Decode JWT Token
        """
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            return payload
        except jwt.ExpiredSignatureError:
            return False
        except jwt.InvalidTokenError:
            return False


jwt_token = JWT()
