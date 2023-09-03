from rest_framework import serializers
from apps.products import models as products_models



class ProductTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = products_models.Tag
        fields = [
            "id",
            "name",
            "slug"
        ]


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = products_models.Category
        fields = [
            "id",
            "name",
            "slug"
        ]


class ProductSubCategorySerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer()
    
    class Meta:
        model = products_models.SubCategory
        fields = [
            "id",
            "category",
            "name",
            "slug"
        ]


class SubProductsColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = products_models.SubProductsColor
        fields = [
            "id",
            "name",
            "slug",
            "code",
            "color_image"
        ]


class SubProductsSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = products_models.SubProductsSize
        fields = [
            "id",
            "name",
            "slug",
            "size",
            "quantity",
            "price"
        ]


class SubProductImageSerialiazer(serializers.ModelSerializer):
    # image = serializers.SerializerMethodField(source="image_full_link")
    class Meta:
        model = products_models.SubProductImage
        fields = [
            "id",
            "image",
        ]



class ProductSerializer(serializers.ModelSerializer):
    category = ProductCategorySerializer()
    sub_category = ProductSubCategorySerializer()
    tag = ProductTagsSerializer(many=True)
    
    class Meta:
        model = products_models.Product
        fields = "__all__"
        depth = 2



class SubProductSerializser(serializers.ModelSerializer):
    color = SubProductsColorSerializer()
    # sizes = SubProductsSizeSerializer()
    images = serializers.SerializerMethodField("get_subproducts_images")
    
    class Meta:
        model = products_models.SubProduct
        exclude = ["product"]
        depth = 2
    
    def get_subproducts_images(self, obj):
        subproduct_obj=products_models.SubProductImage.objects.select_related("subproduct").filter(subproduct=obj)
        serializer_data = SubProductImageSerialiazer(subproduct_obj, many=True).data
        return serializer_data



class NewProductSerialiser(serializers.ModelSerializer):
    category = ProductCategorySerializer()
    sub_category = ProductSubCategorySerializer()
    tag = ProductTagsSerializer(many=True)
    sub_products = serializers.SerializerMethodField("get_subproducts")
    
    class Meta:
        model = products_models.Product
        fields = "__all__"
        
    def get_subproducts(self, obj):
        subproduct_obj=products_models.SubProduct.objects.select_related("product").filter(product=obj)
        serializer_data = SubProductSerializser(subproduct_obj, many=True).data
        return serializer_data