from rest_framework import serializers
from rest_framework.response import Response

from apps.common.models import Enquiry




class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ["name","email","mobile","message"]