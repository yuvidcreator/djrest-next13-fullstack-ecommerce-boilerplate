# import requests
from apps.products import models as products_models, serializers as products_serializers
from apps.products import query as products_query


class StoreProductService:
    
    @staticmethod
    def get_products_all_category():
        categories =  products_query.ProductHandler.get_all_categories()
        if categories:
            data = products_serializers.ProductCategorySerializer(categories, many=True).data
            status = 200
        else:
            data = "No Categories found"
            status = 404
        return data, status
    
    
    @staticmethod
    def get_all_sub_products():
        products = products_query.ProductHandler.get_all_sub_products()
        if products:
            data = products_serializers.SubProductSerializser(products, many=True).data
            status = 200
        else:
            data = "No products found or requested invalid query."
            status = 400
        return data, status


    @staticmethod
    def get_all_products():
        products = products_query.ProductHandler.get_all_products()
        if products:
            # data = products_serializers.ProductSerializer(products, many=True).data
            # data = products_serializers.SubProductSerializser(products, many=True).data
            data = products_serializers.NewProductSerialiser(products, many=True).data
            status = 200
        else:
            data = "No products found or requested invalid query."
            status = 400
        return data, status

    @staticmethod
    def get_featured_product():
        products = products_query.ProductHandler.get_all_featured_products()
        if products:
            data = products_serializers.ProductSerializer(products, many=True).data
            status = 200
        else:
            data = "No products found or requested invalid query."
            status = 400
        return data, status

    # @staticmethod
    # def get_new_arrived_product():
    #     products = products_query.ProductHandler.get_new_arrival_products()
    #     if products:
    #         data = products_serializers.ProductSerializer(products, many=True).data
    #         status = 200
    #     else:
    #         data = "No products found or requested invalid query."
    #         status = 400
    #     return data, status

    @staticmethod
    def get_products_by_category(category_slug):
        products = products_query.ProductHandler.get_all_products_by_category_slug(category_slug)
        if products:
            data = products_serializers.ProductSerializer(products, many=True).data
            status = 200
        else:
            data = "No Active products found or query may be not valid."
            status = 404
        return data, status


    @staticmethod
    def get_product_by_slug(slug):
        product = products_query.ProductHandler.get_product_by_product_slug(slug)
        if product:
            # data = products_serializers.ProductSerializer(product).data
            data = products_serializers.NewProductSerialiser(product).data
            status = 200
        else:
            data = "For Request query, no products found"
            status = 404
        return data, status



class StoreCategoryService:
    
    @staticmethod
    def get_all_categories():
        categories = products_query.ProductHandler.get_all_categories()
        if categories:
            data = products_serializers.ProductCategorySerializer(categories, many=True).data
            status = 200
        else:
            data = "No categories found or requested invalid query."
            status = 400
        return data, status