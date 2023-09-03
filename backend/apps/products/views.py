from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.decorators import api_view
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from apps.products import services as products_services
# Create your views here.


class GetAllCategoriesAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    
    @swagger_auto_schema(
        tags=["Products"],
    )
    def get(self, request, *args, **kwargs):
        try:
            data, status = products_services.StoreProductService.get_products_all_category()
        except Exception as e:
            data, status = 400, f"{e}"
        finally:
            return Response(
                {
                    "status": status,
                    "data": data
                }
            )


class GetAllProductsAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        tags=["Products"],
    )
    def get(self, request, *args, **kwargs):
        try:
            data, status = products_services.StoreProductService.get_all_products()
        except Exception as e:
            status, data = 400, f"{e}"
        finally:
            return Response(
                {
                    "status": status,
                    "data": data
                }
            )



class GetProductBySlugAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    @swagger_auto_schema(
        tags=["Products"],
        manual_parameters=[
            openapi.Parameter("slug", openapi.IN_QUERY, type=openapi.TYPE_STRING)
        ],
    )
    def get(self, request, slug, *args, **kwargs):
        # color = request.data
        # print(color)
        # print(args)
        # print(args)
        try:
            data, status = products_services.StoreProductService.get_product_by_slug(slug)
        except Exception as e:
            status, data = 400, f"{e}"
        finally:
            return Response(
                {
                    "status": status,
                    "data": data
                }
            )