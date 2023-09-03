from django.urls import path
from apps.common.views import CreateEnquiriesAPIView


urlpatterns = [
    path("contact/", CreateEnquiriesAPIView.as_view(), name="enquiry"),
]