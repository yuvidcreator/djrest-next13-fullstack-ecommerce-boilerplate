import datetime
import uuid

from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator

# from coreAPI.dependancies import path_and_rename
from apps.common import models as common_models, utils as common_utils
from .manager import CustomUserManager


class User(AbstractBaseUser, common_models.TimeStampModel, PermissionsMixin):
    GENDER_CHOICES = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Others", "Others"),
    )
    username = models.CharField(max_length=30, null=True, blank=True, verbose_name=_("Username"))
    email = models.EmailField(_("Email address"), unique=True)
    mobile_regex = RegexValidator(
        regex=r'^\d{9,17}$', 
        message="Phone number must be entered in the format: '9999999999'. Up to 16 digits allowed."
    )
    mobile = models.CharField(
        validators=[mobile_regex],
        max_length=17,
        verbose_name=_("Mobile No"),
        unique=True,
        null=True,
        blank=True,
    )
    first_name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("Last Name"))
    gender = models.CharField(max_length=8, choices=GENDER_CHOICES, default="Male", blank=True, verbose_name=_("Gender"))
    profile_picture = models.ImageField(
        default="default.jpg", upload_to=common_utils.users_profile_upload_path, blank=True, null=True, verbose_name=_("Profile Picture")
    )
    date_of_birth = models.DateField(blank=True, null=True, verbose_name=_("Date of Birth"))
    address_line_1 = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Address 1"))
    address_line_2 = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Address 2"))
    pin_code = models.CharField(max_length=10, blank=True, null=True, verbose_name=_("Pin Code"))
    city = models.CharField(max_length=255, null=True, blank=True, verbose_name=_("City"))
    state = models.CharField(max_length=255, null=True, blank=True, verbose_name=_("State"))
    country = models.CharField(max_length=255, null=True, blank=True, verbose_name=_("country"))

    is_blocked = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    is_mobile_verified = models.BooleanField(default=False, verbose_name=_("Is Mobile Verified"))
    is_email_verified = models.BooleanField(default=False, verbose_name=_("Is Email Verified"))
    
    is_first_login = models.BooleanField(default=False, verbose_name=_("Is First Time Login"))
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"{self.email}"

    # def save(self, *args, **kwargs):
    #     if not self.id:
    #         self.first_name, self.last_name = self.name.split(" ")
    #     super(User, self).save(*args, **kwargs)

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        db_table = "users"  # Table Name

    @property
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"



class OTP(models.Model):
    """
    For validation of OTP with expiration of each transaction
    """
    txn_id = models.UUIDField(
        primary_key=True, editable=False, default=uuid.uuid4
    )  # for each taransaction it a uniuq id
    email_or_mobile = models.CharField(
        max_length=255
    )  # user can provide email or mobile number
    otp = models.CharField(max_length=120)  # OTP
    is_verified = models.BooleanField(default=False)
    expire_at = models.DateTimeField()  # OTP expiration time (current time + timedelta)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("OTP")
        verbose_name_plural = _("OTPs")
        db_table = "otp"  # Table Name

    def save(self, *args, **kwargs):
        self.otp = get_random_string(settings.OTP["OTP_DIGIT_LENGTH"], "1234567890")
        self.expire_at = timezone.now() + settings.OTP["OTP_EXPIRATION_TIME"]
        super(OTP, self).save(*args, **kwargs)

    # def __str__(self):
    #     return f"{self.otp} sent on {self.email_or_mobile} & Expires at {self.expire_at}"
    def __str__(self):
        return f"{self.email_or_mobile}"

    @property
    def is_expired(self):
        exp_time = self.expire_at - timezone.now()
        if exp_time < datetime.timedelta(seconds=0):
            return True
        return False


class PasswordResetToken(common_models.TimeStampModel):
    email = models.EmailField(verbose_name=_("Email"))
    token = models.CharField(max_length=500, verbose_name=_("Token"))

    class Meta:
        verbose_name = _("Password Reset Token")
        verbose_name_plural = _("Password Reset Tokens")
        db_table = "passwordresettokens"  # Table Name


class UserAddress(common_models.TimeStampModel):
    GENDER_CHOICES = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Others", "Others"),
    )
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "user_address", verbose_name=_("User"))
    first_name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("First Name"))
    last_name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("Last Name"))
    gender = models.CharField(max_length=8, choices=GENDER_CHOICES, default="Male", blank=True, verbose_name=_("Gender"))
    email = models.EmailField(_("Email address"), unique=True, null = True, blank=True,)
    mobile_regex = RegexValidator(
        regex=r'^\d{9,17}$', 
        message="Phone number must be entered in the format: '9999999999'. Up to 16 digits allowed."
    )
    alternate_number = models.CharField(
        validators=[mobile_regex],
        max_length=17,
        verbose_name=_("Alternate Mobile No"),
        unique=True,
        null=True,
        blank=True,
    )
    address_1 = models.CharField(max_length=64, null = True, blank=True, verbose_name=_("Address 1"))
    address_2 = models.CharField(max_length=64, null = True, blank=True, verbose_name=_("Address 1"))
    locality = models.CharField(max_length = 64, null = True, blank=True, verbose_name=_("Locality"))
    landmark = models.CharField(max_length = 64, null = True, blank=True, verbose_name=_("Landmark"))
    pincode = models.PositiveIntegerField(verbose_name=_("Pincode"))
    city = models.CharField(max_length=24, verbose_name=_("City"))
    state = models.CharField(max_length=24, verbose_name=_("State"))
    country = models.CharField(max_length = 24, verbose_name=_("Country"))
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

    class Meta:
        verbose_name = _("User Address")
        verbose_name_plural = _("User Addresses")
        db_table = "useraddresses"  # Table Name



class RazorpayContact(common_models.TimeStampModel):
    """
    For payout to owner and osty client, we have to create contact id
    """
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "contact", verbose_name=_("User"))
    razorpay_conatct_id = models.CharField(max_length=64, verbose_name=_("Razorpay Contact ID"))

    def __str__(self):
        return f"{self.user.email}"

    class Meta:
        verbose_name = _("Razorpay Contact")
        verbose_name_plural = _("Razorpay Contacts")
        db_table = "razorpaycontacts"  # Table Name


class FundAccout(common_models.TimeStampModel):
    user = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "fund_acc", verbose_name=_("User"))
    contact_id = models.CharField(max_length=64, verbose_name=_("Contact ID"))
    razorpay_fund_id = models.CharField(max_length=64, verbose_name=_("Razorpay Fund ID"))
    account_type = models.CharField(max_length=64, verbose_name=_("Account Type"))
    ifsc = models.CharField(max_length = 64, verbose_name=_("IFSC"))
    bank_name = models.CharField(max_length = 64, verbose_name=_("Bank Name"))
    name = models.CharField(max_length = 64, verbose_name=_("Full Name"))
    account_number = models.PositiveBigIntegerField(verbose_name=_("Bank Account No"))
    is_active = models.BooleanField(default=False, verbose_name=_("Is Active"))

    def __str__(self):
        return f"{self.user.email}"

    class Meta:
        verbose_name = _("Fund Account")
        verbose_name_plural = _("Fund Accounts")
        db_table = "fundaccounts"  # Table Name