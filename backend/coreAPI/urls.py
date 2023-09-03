"""gausrushtiCoreAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)
from django.urls import re_path as url
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from coreAPI.settings.base import env

def trigger_error(request):
    division_by_zero = 1 / 0


urlpatterns = [
    path('sentry-debug/', trigger_error),
    path("admin/", admin.site.urls),
    
    path('api/accounts/', include('apps.accounts.urls')),
    path('api/common/', include('apps.common.urls')),
    path('api/products/', include('apps.products.urls')),
    # path('api/store/', include('apps.store.urls')),
    # path('api/cart/', include('apps.cart.urls')),
    # path('api/orders/', include('apps.orders.urls')),
    # path('api/payments/', include('apps.payments.urls')),
    # path('api/coupons/', include('apps.coupons.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if env("DEV_PHASE")=="prod":
    schema_view = get_schema_view(
        openapi.Info(
            title="InnerKomfort API",
            default_version="v1",
            description="InnerKomfort - Ecommerce store Rest APIs",
            terms_of_service="https://www.google.com/policies/terms/",
            contact=openapi.Contact(email="contact@snippets.local"),
            license=openapi.License(name="BSD License"),
        ),
        public=True,
        permission_classes=(permissions.AllowAny,),
        url="https://api.innerkomfort.in"
    )
elif env("DEV_PHASE")=="dev":
    schema_view = get_schema_view(
        openapi.Info(
            title="InnerKomfort API",
            default_version="v1",
            description="InnerKomfort - Ecommerce store Rest APIs",
            terms_of_service="https://www.google.com/policies/terms/",
            contact=openapi.Contact(email="contact@snippets.local"),
            license=openapi.License(name="BSD License"),
        ),
        public=True,
        permission_classes=(permissions.AllowAny,),
        url="https://devapi.innerkomfort.in"
    )
else:
    schema_view = get_schema_view(
        openapi.Info(
            title="InnerKomfort API",
            default_version="v1",
            description="InnerKomfort - Ecommerce store Rest APIs",
            terms_of_service="https://www.google.com/policies/terms/",
            contact=openapi.Contact(email="contact@snippets.local"),
            license=openapi.License(name="BSD License"),
        ),
        public=True,
        permission_classes=(permissions.AllowAny,),
        url="http://127.0.0.1:8000"
    )

api_docs = [
        url(
            r"^swagger(?P<format>\.json|\.yaml)$",
            schema_view.without_ui(cache_timeout=0),
            name="schema-json",
        ),
        url(
            r"^swagger/$",
            schema_view.with_ui("swagger", cache_timeout=0),
            name="schema-swagger-ui",
        ),
        url(
            r"^redoc/$",
            schema_view.with_ui("redoc", cache_timeout=0),
            name="schema-redoc",
        ),
    ]
urlpatterns += api_docs


admin.site.site_header = "InnerKomfort"
admin.site.site_title = "InnerKomfort Admin Panel"
admin.site.index_title = "Welcome to InnerKomfort"