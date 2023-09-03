from django.urls import path
from apps.products import views as product_views

urlpatterns = [
    path("all-categories/", product_views.GetAllCategoriesAPIView.as_view(), name="Get Products All Categories" ),
    
    path("all-products/", product_views.GetAllProductsAPIView.as_view(), name="Get All Products" ),
    
    path("product/<str:slug>/", product_views.GetProductBySlugAPIView.as_view(), name="Get Product" ), 
]