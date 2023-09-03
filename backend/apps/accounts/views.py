import django
from django.conf import settings
from django.contrib.auth import login
from django.core.cache import cache
from django.db.models import Q
# from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers as ser
from rest_framework.decorators import api_view
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

# from apps.accounts.token import jwt_token
from apps.accounts.utils import authenticate_user, password_validation, validate_email
# from owner.models import InviteHomeOwner
# from portal.models import SocialLink
from services.email import send_email, send_html_mail
from services.otp import send_twilio_sms
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

# from apps.accounts.models import OTP, User
from apps.accounts.utils import get_tokens_for_user
from apps.accounts import models as accounts_models, serializers as accounts_serializers
from django.contrib.auth.hashers import make_password






class ProfileDetailAPI(generics.GenericAPIView):
    def put(self, request, user_id):
        user = accounts_models.User.objects.filter(id=user_id).first()


user_id = openapi.Parameter('user_id', openapi.IN_QUERY, description="Get User Details Data", type=openapi.TYPE_STRING)
user_response = openapi.Response('response description', accounts_serializers.UserSerializer)

@swagger_auto_schema(
    method='get', 
    tags=["Accounts"], 
    # manual_parameters=[user_id], 
    responses={200: user_response})
@api_view(["GET"])
def user_profile_view(request):
    """
    This takes 'user_id' for User Profile Details in 'GET Request'. 
    In 'PUT' request, it takes 'name', 'city', 'address_line_1', 'address_line_2', 'date_of_birth'.
    """
    try:
        # user = accounts_models.User.objects.filter(id=user_id).first()
        user = accounts_models.User.objects.filter(id=request.user.id).first()
        if not user:
            return Response({"status": "failed", "msg": "user not found"})
        if request.method == "GET":
            ser_data = accounts_serializers.UserSerializer(user)
            return Response({"status": "200", "data": ser_data.data}, status=200)
        # elif request.method == "PUT":
        #     ser_data = accounts_serializers.UserUpdateSerializer(user, data=request.data, partial=True)
        #     ser_data.is_valid(raise_exception=True)
        #     ser_data.save()
        #     return Response({"status": "201", "data": ser_data.data}, status=201)
        # elif request.method == "PATCH":
        #     ser_data = accounts_serializers.UserUpdateSerializer(user, data=request.data, partial=True)
        #     ser_data.is_valid(raise_exception=True)
        #     ser_data.save()
        #     return Response({"status": "201", "data": ser_data.data}, status=201)
    except django.core.exceptions.ValidationError:
        return Response({"status": "400", "data": {}}, status=400)



class UserUpdateProfileView(APIView):
    # serializer_class = accounts_serializers.UserUpdateSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        tags=["Accounts"],
    )
    def get(self, request, *args, **kwargs):
        user = accounts_models.User.objects.filter(id=request.user.id).first()
        ser_data = accounts_serializers.UserSerializer(user)
        # ser_data.is_valid(raise_exception=True)
        # ser_data.save()
        return Response({"status": "200", "data": ser_data.data}, status=200)

    @swagger_auto_schema(
        tags=["Accounts"],
        request_body=accounts_serializers.UserUpdateSerializer,
        description="This takes 'user_id' to User Profile Details in 'GET Request'. In 'PATCH' request, it takes 'user_id', and any other fields to get updated."
    )
    def put(self, request,*args,**kwargs):
        print(request.data)
        # user = accounts_models.User.objects.filter(id=user_id).first()
        user = accounts_models.User.objects.filter(id=request.user.id).first()
        print(user)
        ser_data = accounts_serializers.UserUpdateSerializer(user, data=request.data, partial=True)
        if ser_data.is_valid(raise_exception=True):
            ser_data.update()
        return Response({"status": "201", "message":"User Profile Updated Successfully.", "data": ser_data.data}, status=201)

    @swagger_auto_schema(
        tags=["Accounts"],
        request_body=accounts_serializers.UserUpdateSerializer,
        description="This takes 'user_id' to User Profile Details in 'GET Request'. In 'PATCH' request, it takes 'user_id', and any other fields to get updated."
    )
    def patch(self, request,*args,**kwargs):
        # user = accounts_models.User.objects.filter(id=user_id).first()
        user = accounts_models.User.objects.filter(id=request.user.id).first()
        ser_data = accounts_serializers.UserUpdateSerializer(user, data=request.data, partial=True)
        ser_data.is_valid(raise_exception=True)
        ser_data.update()
        return Response({"status": "201", "message":"User Profile Updated Successfully.", "data": ser_data.data}, status=201)


class EmailUpdateAPIView(generics.GenericAPIView):
    """
    These are mandatory fields and Takes a string of an email address which must contain @ 
    and you need to provide is_forgot_password field value in boolean
    """
    serializer_class = accounts_serializers.EmailMobileInSerializer
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
        request_body=accounts_serializers.EmailMobileInSerializer,
    )
    def post(self, request, user_id):
        user = accounts_models.User.objects.filter(id=user_id).first()
        self.serializer_class(data=request.data).is_valid(raise_exception=True)
        request.data["email"] = request.data["email_or_mobile"]
        if not user:
            return Response({"status": "failed", "msg": "user not found"})
        if request.data["email"] == user.email:
            return Response({"message": "email updated", "status": "400"}, status=400)

        if accounts_models.User.objects.filter(email=request.data["email_or_mobile"]).exists():
            return Response(
                {"message": "User with this email already exists", "status": "400"}, status=400
            )
        otp = accounts_models.OTP.objects.filter(email_or_mobile=request.data["email"]).first()
        if not otp:
            otp = accounts_models.OTP(email_or_mobile=request.data["email"])
            otp.save()
        print(otp.otp)
        send_email("OTP", f"OTP for Osty is {otp.otp}", request.data["email"])
        return Response(
            {
                "message": f"An OTP has sent to {request.data['email']}",
                "txn_id": otp.txn_id,
                "status": "200",
            }
        )

    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
        request_body=accounts_serializers.EmailMobileInSerializer,
    )
    def put(self, request, user_id):
        response = {"message": "", "status": "400"}
        try:
            txn_id = request.data["txn_id"]
            otp_in = request.data["otp"]
            otp = accounts_models.OTP.objects.filter(txn_id=txn_id, otp=otp_in).first()
            if otp:
                if not otp.is_expired:
                    user = accounts_models.User.objects.filter(id=user_id).first()
                    if user:
                        user.email = otp.email_or_mobile
                        user.save()
                        otp.delete()
                        response["message"] = "Email updated successfully"
                        response["status"] = "200"
                    else:
                        response["message"] = f"No user found"
                else:
                    response["message"] = f" OTP expired"
            else:
                response["message"] = f"Invalid OTP"
        except KeyError as key:
            response["message"] = f"{key} required"
        finally:
            return Response(response)


@swagger_auto_schema(
    methods=["POST"],
    tags=["Accounts"],
    security=[],
)
@api_view(["POST"])
def send_otp_for_email_update(request):
    """
    Logged in User Email updated --> This takes "email" (e.g. "email": "abcd@gmail.com") to update User's new Email ID.
    POST Method --> 
    https://api.osty.in/api/accounts/send-otp-to-updated-email/
    
    {
        "email": "abcd@gmail.com"
    }
    """
    user_id = request.user.id
    email = request.data["email"]
    user = accounts_models.User.objects.filter(id=user_id)
    if user.exists():
        if "@" not in email or validate_email(email):
            return Response({"message": "Email id not valid", "status": "403"}, status=403)
            # return Response({"message": "Something wrong with Email entered", "status": "403"}, status=403)
        else:
            otp = accounts_models.OTP.objects.filter(email_or_mobile=email).first()
            if not otp:
                print("otp not found --> new otp created for email update")
                otp = accounts_models.OTP(email_or_mobile=email)
                otp.save()
            print(otp.otp)
            send_email("Osty | OTP for Email update", otp.otp, email)
            # data = {"otp": otp.otp}
            # send_html_mail(
            #     subject="Osty | OTP for Email update",
            #     template="email/password-changed.html",
            #     email_to=user.email,
            #     data=data,
            # )
            return Response({"message": "OTP sent on New Email", "txn_id": otp.txn_id, "status":"200"}, status=200)
    else:
        return Response({"message": "User not found or must be login to update email", "status": "404"}, status=404)


@swagger_auto_schema(
    methods=["POST"],
    tags=["Accounts"],
    security=[],
    request_body=accounts_serializers.OtpInSerializer,
)
@api_view(["POST"])
def validate_otp_for_email_update(request):
    """
    User Update endpoint. 
    It takes "txn_id" & "otp".
    """
    if request.method == "POST":
        accounts_serializers.OtpInSerializer(data=request.data).is_valid(raise_exception=True)
        txn_id = request.data["txn_id"]
        otp = request.data["otp"]
        print(txn_id, otp)
        otp = accounts_models.OTP.objects.filter(txn_id=txn_id, otp=otp).first()
        if otp:
            if not otp.is_expired:
                # user = accounts_models.User.objects.filter(email=otp.email_or_mobile).first()
                user = accounts_models.User.objects.filter(id=request.user.id)
                if user.exists():
                    user.update(email=otp.email_or_mobile)
                    otp.delete()
                    send_email(
                        "Osty | Email updated Successfully", 
                        f"New Email - {otp.email_or_mobile} updated Successfully.", 
                        otp.email_or_mobile
                    )
                    return Response(
                        {
                            "message": "OTP verified and Email updated successfully.",
                            "status": "201",
                        },
                        status=201
                    )
                return Response(
                    {"message": "User not found or must be login to verify otp", "status": "404"}, status=404
                )
            return Response({"message": "OTP expired", "status": "400"}, status=400)
        return Response({"message": "Invalid OTP", "status": "400"}, status=400)
    return Response({"message": "method not allowed"}, status=405)




# login with Password API 
class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
        request_body=accounts_serializers.LoginSerializer,
    )
    def post(self, request, *args, **kwargs):
        response = Response()
        
        # print(request.data)
        data = accounts_serializers.LoginSerializer(data=request.data).is_valid(
            raise_exception=True
        )
        email = request.data["email_or_mobile"] or request.data["email"]
        password = request.data["password"]
        # print(email, password)
        # is_email = validate_email(email)
        
        user, msg = authenticate_user(request, email, password)

        if user:
            if "@" not in email and not user.is_mobile_verified:
                return Response({"status": "400", "message": msg}, status=400)
            
            data = accounts_serializers.UserSerializer(user).data
            login(request, user)
            token = get_tokens_for_user(user)
            
            if response.status_code == 200:
                if token:
                    response.set_cookie(
                        'access',
                        token["access"],
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                    response.set_cookie(
                        'refresh',
                        token["refresh"],
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                return response
            else:
                return Response({"status": "401", "message": msg}, status=401)
        else:
            return Response({"status": "400", "message": msg}, status=400)


# Refresh token
class CustomTokenRefreshView(TokenRefreshView):
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
    )
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')

        if refresh_token:
            request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )

        return response


#Verify token
class CustomTokenVerifyView(TokenVerifyView):
    # permission_classes = [permissions.IsAuthenticated]
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
    )
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)


# Logout (Delete / expire HttpOnly Cookie)
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
    )
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response



@swagger_auto_schema(methods=["GET"], tags=["Accounts"], security=[])
@api_view(["GET"])
def check_email_exists_view(request, email):
    if accounts_models.User.objects.filter(email=email).exists():
        return Response(
            {
                "message": "Email already registered. choose another one",
                "status": "403",
            },
            status=403,
        )
    return Response({"message": "Email avalilable", "status": "200"}, status=200)



# Send OTP for User Signup / Login
class RequestOTPForSignupOrLoginAPIView(APIView):
    permission_classes = [AllowAny]
    # serializer_class = accounts_serializers.UserSignUpSerializer
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
        request_body=accounts_serializers.EmailMobileInSerializer,
    )
    def post(self, request, *args, **kwargs):
        print(request.data)
        response = Response()
        email=""
        mobile=""
        if "@" in request.data["email_or_mobile"]:
            email = request.data["email_or_mobile"]
        else:
            mobile = request.data["email_or_mobile"]
        
        user = accounts_models.User.objects.filter(Q(email=email) | Q(mobile=mobile)).first()  
        
        # if request.data["checkout"] == True:
        #     serializer = accounts_serializers.UserSignUpFromCheckoutPageSerializer(data=request.data)
        # else:
        #     # serializer = accounts_serializers.UserSignUpSerializer(data=request.data)
        #     serializer = accounts_serializers.EmailMobileInSerializer(data=request.data)
        
        serializer = accounts_serializers.EmailMobileInSerializer(data=request.data)
        
        serializer.is_valid(raise_exception=True)
        
        if user:
            if request.data["send_otp_on_mobile"]:
                otp = accounts_models.OTP.objects.filter(email_or_mobile=mobile).first()
                if otp:
                    otp.is_verified = False
                    otp.save()
                    response.set_cookie(
                        'OtpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                else:
                    otp = accounts_models.OTP.objects.create(email_or_mobile=mobile, is_verified=False)
                    otp.save()
                    response.set_cookie(
                        'otpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                # TODO: twillio sms otp
                send_twilio_sms(otp.email_or_mobile, otp.otp)
                cache.set(
                    f"{otp.txn_id}", 
                    [value for value in serializer.data.values()], 
                    timeout=60*5
                )
                return response
            else:
                otp = accounts_models.OTP.objects.filter(email_or_mobile=email).first()
                if otp:
                    otp.is_verified = False
                    otp.save()
                    response.set_cookie(
                        'otpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                else:
                    otp = accounts_models.OTP.objects.create(email_or_mobile=email, is_verified=False)
                    otp.save()
                    response.set_cookie(
                        'otpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                # TODO: email otp
                template = "email/login_via_otp_email.html"
                # print(user_email)
                send_html_mail(
                    "Welcome to Osty - Online store Account creation is just one step away",
                    template,
                    email,
                    {
                        "otp": otp.otp,
                        # "first_name":request.data["first_name"],
                        # "last_name":request.data["last_name"]
                    }
                )                
                cache.set(
                    f"{otp.txn_id}", 
                    [value for value in serializer.data.values()], 
                    timeout=60*5
                )
                return response
        else:
            if request.data["send_otp_on_mobile"]:
                otp = accounts_models.OTP.objects.filter(email_or_mobile=mobile).first()
                if otp:
                    otp.is_verified = False
                    otp.save()
                    response.set_cookie(
                        'otpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                else:
                    otp = accounts_models.OTP.objects.create(email_or_mobile=mobile, is_verified=False)
                    otp.save()
                    response.set_cookie(
                        'otpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                # TODO: twillio sms otp
                send_twilio_sms(otp.email_or_mobile, otp.otp)
                cache.set(
                    f"{otp.txn_id}", 
                    [value for value in serializer.data.values()], 
                    timeout=60*5
                )
                return response
            else:
                otp = accounts_models.OTP.objects.filter(email_or_mobile=email).first()
                if otp:
                    otp.is_verified = False
                    otp.save()
                    response.set_cookie(
                        'otpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                else:
                    otp = accounts_models.OTP.objects.create(email_or_mobile=email, is_verified=False)
                    otp.save()
                    response.set_cookie(
                        'otpTxnID',
                        otp.txn_id,
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                # TODO: email otp
                template = "email/signup.html"
                # print(user_email)
                send_html_mail(
                    "Welcome to Osty - Online store Account creation is just one step away",
                    template,
                    email,
                    {
                        "otp": otp.otp,
                        # "first_name":request.data["first_name"],
                        # "last_name":request.data["last_name"]
                    }
                )                
                cache.set(
                    f"{otp.txn_id}", 
                    [value for value in serializer.data.values()], 
                    timeout=60*5
                )
                return response
            


#  Signup / Login Confirm OTP
class ConfirmOTPAPIView(APIView):
    permission_classes = [AllowAny]
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
        request_body=accounts_serializers.OtpInSerializer,
    )
    def post(self, request, *args, **kwargs):
        response = Response(status.HTTP_202_ACCEPTED)
        accounts_serializers.OtpInSerializer(data=request.data).is_valid(raise_exception=True)
        txn_id = request.COOKIES.get('otpTxnID')
        # print(txn_id)
        otp = request.data["otp"]
        otp = accounts_models.OTP.objects.filter(txn_id=txn_id, otp=otp).first()
        email=""
        mobile=""
        # print(cache.get(f"{txn_id}"))
        if otp:
            if not otp.is_expired:
                otp.is_verified = True
                otp.save()
                
                # first_name, last_name, email, mobile, send_otp_on_mobile, checkout = cache.get(f"{txn_id}")
                email_or_mobile, send_otp_on_mobile, checkout = cache.get(f"{txn_id}")
                if "@" in email_or_mobile:
                    email = email_or_mobile
                else:
                    mobile = email_or_mobile
                
                user = accounts_models.User.objects.filter(Q(email=email) | Q(mobile=mobile)).first()
                
                if not user:
                    user = accounts_models.User.objects.create(
                        # first_name=first_name,
                        # last_name=last_name,
                        email=email,
                        mobile=mobile,
                        is_active=True,
                        # is_owner=True if user_type == "owner" else False,
                    )
                
                if send_otp_on_mobile:
                    accounts_models.User.objects.filter(id = user.id).update(is_mobile_verified=True)
                else:
                    accounts_models.User.objects.filter(id = user.id).update(is_email_verified=True)
                
                if checkout:
                    # accounts_models.User.objects.filter(id = user.id).update(
                    #     address_line_1=address_line_1,
                    #     pin_code=pin_code,
                    #     city=city,
                    #     state=state,
                    #     country=country
                    # )
                    pass
                
                cache.delete(f"{txn_id}")
                otp.delete()
                response.delete_cookie('otpTxnID')
                
                login(request, user)
                token = get_tokens_for_user(user)
                
                if not user.is_first_login:
                    data = {
                        # "first_name": user.first_name,
                        # "last_name": user.last_name,
                        "email": user.email,
                        "mobile": user.mobile,
                        "is_mobile_verified": user.is_mobile_verified,
                        "is_email_verified": user.is_email_verified
                    }
                    template = "email/aboard.html"
                    send_html_mail("Welcome to Osty",template,user.email,data)
                    accounts_models.User.objects.filter(id = user.id).update(is_first_login=True)
                
                if token:
                    response.set_cookie(
                        'access',
                        token["access"],
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                    response.set_cookie(
                        'refresh',
                        token["refresh"],
                        max_age=settings.AUTH_COOKIE_MAX_AGE,
                        path=settings.AUTH_COOKIE_PATH,
                        secure=settings.AUTH_COOKIE_SECURE,
                        httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                        samesite=settings.AUTH_COOKIE_SAMESITE
                    )
                    return response
                else:
                    return Response({"message": "Somthing went wrong with Tokens", "status":"400"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({"message": "OTP expired", "status": "400"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"message": "Invalid OTP", "status": "404"}, status=status.HTTP_400_BAD_REQUEST)



@swagger_auto_schema(
    methods=["POST"],
    tags=["Accounts"],
    security=[],
)
@api_view(["POST"])
def verify_mobile_after_login(request):
    """
    Verify Mobile after Login
    """
    req_mobile = request.data["mobile"]
    try:
        if accounts_models.User.objects.filter(
            id=request.user.id, mobile=req_mobile, is_mobile_verified=True
        ).exists():
            return Response(
                {"status": "400", "message": f"mobile number already Verified"},
                status=400,
            )
        user = request.user
        # print(user.mobile)
        otp = accounts_models.OTP.objects.filter(email_or_mobile=req_mobile).first()
        if otp:
            otp.is_verified = False
            otp.save()
        else:
            otp = accounts_models.OTP.objects.create(
                email_or_mobile=req_mobile, is_verified=False
            )
        # TODO: sms otp
        send_twilio_sms(otp.email_or_mobile, otp.otp)
        return Response(
            {
                "status": "200",
                "message": f"otp sent to {req_mobile} successfully",
                "txn_id": otp.txn_id,
            },
            status=200
        )
    # except KeyError as key:
    except Exception as e:
        return Response({"status": "400", "message": f"{e}"}, status=400)


@swagger_auto_schema(
    methods=["POST"],
    tags=["Accounts"],
    security=[],
    request_body=accounts_serializers.OtpInSerializer,
)
@api_view(["POST"])
def verify_mobile_otp(request):
    """
    Verify OTP for Mobile no
    This takes "txn_id" & "otp".
    "payment_check_out" default is false & its not mandatory to send bolean value.
    """
    user = accounts_models.User.objects.get(id=request.user.id)
    accounts_serializers.OtpInSerializer(data=request.data).is_valid(raise_exception=True)
    txn_id = request.data["txn_id"]
    otp_in = request.data["otp"]
    otp = accounts_models.OTP.objects.filter(txn_id=txn_id, otp=otp_in).first()
    if otp:
        if not otp.is_expired:
            otp.is_verified = True
            otp.save()
            # request.user.mobile = otp.email_or_mobile
            # request.user.is_mobile_verified = True
            # request.user.save()
            user.mobile = otp.email_or_mobile
            user.is_mobile_verified = True
            user.save()
            # accounts_models.User.objects.update(
            #     mobile = otp.email_or_mobile,
            #     is_mobile_verified = True
            # )
            # up_user.save()
            otp.delete()
            return Response(
                {"status": "success", "message": "mobile number verified sucessfully"},
                status=200,
            )
        return Response({"message": "OTP expired", "status": "400"}, status=400)
    return Response({"message": "Invalid OTP", "status": "400"}, status=400)




@swagger_auto_schema(methods=["GET"],
    tags=["Accounts"],
    security=[],  
)
@api_view(["GET"])
def check_mobile_exists_view(request, mobile):
    try:
        if accounts_models.User.objects.filter(mobile=mobile).exists():
            return Response({"message": "Mobile Already Exists", "status": "400"}, status=400)
        return Response({"message": "Mobile Available", "status": "200"}, status=200)
    except KeyError as key:
        return Response({"message": f"{key} is missing", "status": "400"}, status=404)



# If user on checkoout page, he should create an account
class SignupFromCheckouPageAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = accounts_serializers.UserSignUpFromCheckoutPageSerializer
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
        request_body=accounts_serializers.UserSignUpFromCheckoutPageSerializer,
    )
    def post(self, request, *args, **kwargs):
        # data = request.data
        print(request.data)
        email = request.data["email"]
        mobile = request.data["mobile"]
        send_otp_on_mobile=request.data["send_otp_on_mobile"]
        user = accounts_models.User.objects.filter(Q(email=request.data["email"]) | Q(mobile=request.data["mobile"])).first()
        print(user)
        is_user: bool = bool(user)
        print(is_user)
        if is_user:
            ser = accounts_serializers.EmailMobileInSerializer(data=request.data)
            # ser.is_valid(raise_exception=True)
            
            otp = accounts_models.OTP.objects.filter(Q(email_or_mobile=email) | Q(email_or_mobile=mobile)).first()
            if not otp:
                if send_otp_on_mobile:
                    otp = accounts_models.OTP(email_or_mobile=mobile)
                else:
                    otp = accounts_models.OTP(email_or_mobile=email)
                otp.save()
                print("otp not found -- hence created new")
            
            print(otp.otp)
            
            if send_otp_on_mobile and user.mobile:
                send_twilio_sms(otp.email_or_mobile, otp.otp)
                print("otp sent to mobile")
                print(mobile)
            else:
                template = "email/login_via_otp_email.html"
                email_subject = "The Osty | Sign-in request"
                print("Login with OTP sent")
                print(user.email)
                send_html_mail(email_subject, template, email, {"otp":otp.otp, "name":user.first_name})
                # send_html_mail(email_subject, template, email_or_mobile, {"otp": otp.otp,"first_name":request.data["first_name"],"last_name":request.data["last_name"]})
                print("otp sent to email")
            
            return Response(
                {
                    "status": "200",
                    "auth_type": "login",
                    "message": f"Login OTP has been sent to {otp.email_or_mobile}",
                    "txn_id": otp.txn_id,
                },
                status=200
            )
        
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        if send_otp_on_mobile:
            otp = accounts_models.OTP.objects.filter(email_or_mobile=mobile).first()
            if otp:
                otp.is_verified = False
                otp.save()
            else:
                otp = accounts_models.OTP.objects.create(email_or_mobile=mobile, is_verified=False)
                otp.save()
            # TODO: twillio sms otp
            send_twilio_sms(otp.email_or_mobile, otp.otp)
            cache.set(
                f"{otp.txn_id}", 
                [value for value in serializer.data.values()], 
                timeout=60*5
            )

            return Response(
                {
                    "status": "200",
                    "auth_type": "signup",
                    "message": f"Osty, Signup otp sent to {mobile} successfully",
                    "txn_id": otp.txn_id,
                },
                status=200
            )
        else:
            otp = accounts_models.OTP.objects.filter(email_or_mobile=email).first()
            if otp:
                otp.is_verified = False
                otp.save()
            else:
                otp = accounts_models.OTP.objects.create(email_or_mobile=email, is_verified=False)
                otp.save()
            # TODO: email otp
            template = "email/signup.html"
            # print(user_email)
            send_html_mail(
                "Welcome to Osty - Online store Account creation is just one step away",
                template,
                email,
                {
                    "otp": otp.otp,
                    "first_name":request.data["first_name"],
                    "last_name":request.data["last_name"]
                }
            )                
            cache.set(
                f"{otp.txn_id}", 
                [value for value in serializer.data.values()], 
                timeout=60*5
            )
            return Response(
                {
                    "status": "200",
                    "auth_type": "signup",
                    "message": f"Osty store Signup otp sent to {email} successfully",
                    "txn_id": otp.txn_id,
                },
                status=200
            )



class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    # @swagger_auto_schema(
    #     tags=["Accounts"],
    #     security=[],
    #     request_body=accounts_serializers.UserSerializer,
    # )
    def get(self, request, *args, **kwargs):
        user_id = request.user.id
        user = accounts_models.User.objects.filter(id = user_id).first()
        user_ser_data = accounts_serializers.UserSerializer(user).data
        return Response(user_ser_data)
    
    @swagger_auto_schema(
        tags=["Accounts"],
        security=[],
    )
    def put(self, request, *args, **kwargs):
        user_id = request.user.id
        user = accounts_models.User.objects.filter(id = user_id).first()
        user_ser_data = accounts_serializers.UserSerializer(user).data
        pass



# UserAddress APIView

class UserAddressListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = accounts_models.UserAddress.objects.all()
    serializer_class = accounts_serializers.UserAddressSerializer

    def get_queryset(self):
        return self.request.user.user_address.all()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserAddressDeleteUpdateView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = accounts_models.UserAddress.objects.all()
    serializer_class = accounts_serializers.UserAddressSerializer