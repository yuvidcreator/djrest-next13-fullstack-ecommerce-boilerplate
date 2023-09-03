from django.conf import settings
from rest_framework import serializers

from apps.accounts import models as accounts_models
from apps.accounts.utils import password_validation, validate_email


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts_models.User
        exclude = ["password", "is_staff", "is_superuser"]


class UserUpdateSerializer(serializers.ModelSerializer):
    # dob_format = serializers.SerializerMethodField("get_dob_format", required=False)
    date_of_birth = serializers.DateField(write_only=True, required=False)
    # profile_picture = serializers.ImageField(source="get_profile_picture", required=False)
    class Meta:
        model = accounts_models.User
        fields = [
            "first_name",
            "last_name",
            # "dob_format",
            "date_of_birth",
            "gender",
            # "profile_picture",
            "address_line_1",
            "address_line_2",
            # "pin_code",
            "city",
            "state",
            "country",
        ]

        extra_kwargs = {"email": {"read_only": True}}

    def get_dob_format(self, obj):
        if obj.date_of_birth:
            return obj.date_of_birth.strftime("%d-%m-%Y")

    def get_profile_picture(self, obj):
        return obj.profile_picture.url


class OtpInSerializer(serializers.Serializer):
    otp = serializers.CharField(min_length=settings.OTP["OTP_DIGIT_LENGTH"])
    # txn_id = serializers.UUIDField()


class ChangePasswordSerializer(serializers.Serializer):
    old_pwd = serializers.CharField()
    new_pwd = serializers.CharField()
    confirm_pwd = serializers.CharField()


class EmailMobileInSerializer(serializers.Serializer):
    email_or_mobile = serializers.CharField()
    send_otp_on_mobile = serializers.BooleanField(default=False)
    checkout = serializers.BooleanField(default=False)


class EmailInSerializer(serializers.Serializer):
    email = serializers.EmailField()
    user_type = serializers.CharField()


class UserSignUpSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=25)
    last_name = serializers.CharField(max_length=25)
    email = serializers.EmailField()
    mobile = serializers.CharField()
    send_otp_on_mobile = serializers.BooleanField(default=False)
    checkout = serializers.BooleanField(default=False)
    # user_type = serializers.CharField()

    def validate(self, data):
        email = data["email"]
        if not validate_email(email):
            raise serializers.ValidationError("Enter a valid email address")
        return data


class UserSignUpFromCheckoutPageSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=25)
    last_name = serializers.CharField(max_length=25)
    email = serializers.EmailField()
    mobile = serializers.CharField(max_length=10)
    address_line_1 = serializers.CharField(max_length=255)
    pin_code = serializers.CharField(max_length=10)
    city = serializers.CharField(max_length=255)
    state = serializers.CharField(max_length=255)
    country = serializers.CharField(max_length=255)
    send_otp_on_mobile = serializers.BooleanField(default=False)
    is_customer = serializers.BooleanField(default=False)
    checkout = serializers.BooleanField(default=False)

    def validate(self, data):
        email = data["email"]
        if not validate_email(email):
            raise serializers.ValidationError("Enter a valid email address")
        return data


class UserSignUpWithPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    txn_id = serializers.UUIDField()

    def validate(self, data):
        password = data["password"]
        return password_validation(password)


class ForgotPasswordSerializer(serializers.Serializer):
    password = serializers.CharField()
    cinform_password = serializers.CharField()


class LoginSerializer(serializers.Serializer):
    email_or_mobile = serializers.CharField()
    password = serializers.CharField(required=False)
    payment_check_out = serializers.BooleanField(default=False)

    def validate(self, data):
        if not data.get("password"):
            raise serializers.ValidationError({"password": "Please enter password"})
        return data


class LoginWithOTPSerializer(serializers.Serializer):
    email_or_mobile = serializers.CharField()
    send_otp_on_mobile = serializers.BooleanField(default=False)
    # user_type = serializers.CharField()

    def validate(self, data):
        email = data["email"]
        if not validate_email(email):
            raise serializers.ValidationError("Enter a valid email address")
        return data


class UserAddressSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only = True)
    class Meta:
        model = accounts_models.UserAddress
        fields = "__all__"