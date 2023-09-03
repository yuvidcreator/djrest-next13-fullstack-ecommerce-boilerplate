from drf_yasg.utils import swagger_auto_schema
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.common.serializers import EnquirySerializer
# Create your views here.



class CreateEnquiriesAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        tags=["Enquiry"],
        security=[],
        request_body=EnquirySerializer
    )
    def  post(self, request, *args, **kwargs):
        print(request.data)
        serialized_data = EnquirySerializer(data=request.data)
        if serialized_data.is_valid(raise_exception=True):
            serialized_data.save()
            return Response({"message":"Enquiry Sent Successfully", "response": serialized_data.data}, status=status.HTTP_200_OK)
        else:
            return Response({"message":"Something went wrong"}, status=status.HTTP_403_FORBIDDEN)