from django.db.models import Q
from apps.products import models as products_models



class ProductHandler:
    
    @classmethod
    def get_all_tags(cls):
        return products_models.Tag.objects.all()

    @classmethod
    def get_tag_by_slug(cls, tag_slug):
        return products_models.Tag.objects.filter(slug=tag_slug).first()

    @classmethod
    def get_all_categories(cls):
        return products_models.Category.objects.all()

    @classmethod
    def get_category_by_slug(cls, category_slug):
        return products_models.Category.objects.filter(slug=category_slug).first()
    
    
    @classmethod
    def get_all_products(cls):
        products =  products_models.Product.objects.filter(
            product_status="Published", is_active=True
        )
        return products

    @classmethod
    def get_all_sub_products(cls):
        products =  products_models.Product.objects.filter(
            product_status="Published", is_active=True
        )
        list_of_subproducts = []
        for product in products:
            sub_product = products_models.SubProduct.objects.filter(product = product).first()
            list_of_subproducts.append(sub_product)
        return list_of_subproducts
        # if products.exists():
        #     return products
        # else:
        #     return "There is No Active or published products"
    
    @classmethod
    def get_product_by_product_slug(cls, slug: str):
        product_obj = products_models.Product.objects.filter(slug=slug, product_status="Published", is_active=True).first()
        # print(product_obj, "--------- product")
        # sub_product = products_models.SubProduct.objects.filter(product = product_obj).all()
        return product_obj
    
    @classmethod
    def get_all_featured_products(cls):
        products =  products_models.Product.objects.filter(
            product_status="Published", is_active=True, is_featured=True
        )
        return products
        # if products.exists():
        #     return products
        # else:
        #     return "There is No Active or published products"
    
    # @classmethod
    # def get_new_arrival_products(cls):
    #     products =  products_models.Product.objects.filter(
    #         product_status="Published", is_active=True, isNewArrival=True
    #     )
    #     return products
    
    @classmethod
    def get_all_products_by_category_slug(cls, product_category_slug: str):
        category_obj = products_models.Category.objects.filter(slug=product_category_slug).first()
        print(category_obj)
        products = products_models.Product.objects.filter(category=category_obj)
        print(products)
        return products

