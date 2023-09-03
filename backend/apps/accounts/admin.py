from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .forms import CustomUserChangeForm, CustomUserCreationForm
from .models import OTP, User, PasswordResetToken, UserAddress, RazorpayContact, FundAccout


class UserAdmin(BaseUserAdmin):
    ordering = ["email"]
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = [
        "first_name",
        "last_name",
        "email",
        "mobile",
        "is_staff",
        "is_active",
        "is_first_login",
        "created_at"
    ]
    list_display_links = list_display
    list_filter = [
        "email",
        "mobile",
        "first_name",
        "last_name",
        "is_active",
    ]
    fieldsets = (
        (
            _("Login Credentials"),
            {
                "fields": (
                    "email",
                    "password",
                )
            },
        ),
        (
            _("Personal Information"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "mobile",
                    "is_mobile_verified",
                    "gender",
                    "profile_picture",
                    "date_of_birth",
                    "address_line_1",
                    "address_line_2",
                    "city",
                    "state",
                    "country"
                )
            },
        ),
        (
            _("Permissions and Groups"),
            {
                "fields": (
                    "is_first_login",
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (_("Important Dates"), {"fields": ("last_login",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "is_staff", "is_active",),
            },
        ),
    )
    search_fields = ["email", "mobile"]


admin.site.register(User, UserAdmin)
admin.site.register(OTP)
admin.site.register(PasswordResetToken)


@admin.register(UserAddress)
class UserAddressAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["first_name", "last_name", "alternate_number", "address", "locality", "landmark", "pincode", "city", "state", "country"]
    readonly_fields = ["created_at", "updated_at"]
    list_display = ["user", "alternate_number", "pincode", "city", "state", "country", "created_at", "updated_at"]
    list_display_links = list_display


@admin.register(RazorpayContact)
class RazorpayContactAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["user", "razorpay_conatct_id"]
    readonly_fields = ["created_at", "updated_at"]
    list_display = ["user", "razorpay_conatct_id", "created_at", "updated_at"]
    list_display_links = list_display


@admin.register(FundAccout)
class FundAccountAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["user", "contact_id", "razorpay_fund_id"]
    readonly_fields = ["created_at", "updated_at"]
    list_display = ["user", "contact_id", "razorpay_fund_id", "ifsc", "bank_name", "created_at", "updated_at"]
    list_display_links = list_display