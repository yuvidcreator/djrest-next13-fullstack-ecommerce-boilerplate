from django.urls import path
from apps.accounts import views

urlpatterns = [
    # Check email or mobiel 
    path("check-email/<email>/", views.check_email_exists_view, name="send-otp"),
    path("check-mobile/<mobile>/", views.check_mobile_exists_view, name="check-mobile"),
    
    # User signup with OTP
    path("loginreg-request-otp/", views.RequestOTPForSignupOrLoginAPIView.as_view(), name="user-signup"), 
    path("loginreg-confirm-otp/", views.ConfirmOTPAPIView.as_view(), name="signup-confirm-otp"), 
    
    path("login/", views.LoginAPIView.as_view(), name="login"),
    path('refresh/', views.CustomTokenRefreshView.as_view()),
    path('verify/', views.CustomTokenVerifyView.as_view()),
    path('logout/', views.LogoutView.as_view()),
    
    # Create User from Checkout page of UI
    path("checkout-login-signup-user/", views.SignupFromCheckouPageAPIView.as_view(), name="checkout-page-user-signup"), 
    
    # Venrify mobile
    path("verify-phonenumber/", views.verify_mobile_after_login, name="verify-phonenumber"),
    path("verify-mobile-otp/", views.verify_mobile_otp, name="verify-mobile-otp"),
    
    # User Profile CRUD
    # path("get-profile-detail/", views.user_profile_view, name="get-profile-detail"),
    # path("update-profile-detail/", views.UserUpdateProfileView.as_view(), name="update-profile-detail"),
    path("user-profile/", views.UserProfileAPIView.as_view(), name="user-profile-crud-api"),
    
    # Update Email
    path("send-otp-to-update-email/", views.send_otp_for_email_update, name="send-otp-to-update-email"),
    path("validate-otp-to-update-email/", views.validate_otp_for_email_update, name="validate-otp-to-update-email"),
    # path("email-update/<user_id>/", views.EmailUpdateAPIView.as_view(), name="email-update"),
    
    # User address urls
    path('user-address/',views.UserAddressListCreateView.as_view(),name = "user-address"),
    path('user-address/<int:pk>/',views.UserAddressDeleteUpdateView.as_view(),name = "user-address")
]
