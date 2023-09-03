from django.contrib import admin

from apps.products import models as products_models
# Register your models here.





class TabularInlineBase(admin.TabularInline):
    list_per_page = 2



@admin.register(products_models.Tag)
class TagAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["name",]
    readonly_fields = ["slug", "created_at", "updated_at"]
    list_display = ["name", "slug", "created_at", "updated_at"]
    list_display_links = list_display


@admin.register(products_models.Category)
class CategoryAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["name",]
    readonly_fields = ["slug", "created_at", "updated_at"]
    list_display = ["name", "slug", "created_at", "updated_at"]
    list_display_links = list_display


@admin.register(products_models.SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["name",]
    readonly_fields = ["slug", "created_at", "updated_at",]
    list_display = ["name", "slug", "created_at", "updated_at"]
    list_display_links = list_display


@admin.register(products_models.SubProductsColor)
class SubProductsColorAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["name","code",]
    readonly_fields = ["slug", "created_at", "updated_at",]
    list_display = ["name", "slug", "code", "created_at", "updated_at"]
    list_display_links = list_display


@admin.register(products_models.SubProductsSize)
class SubProductsSizeAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["name","size","quantity","price"]
    readonly_fields = ["slug", "created_at", "updated_at",]
    list_display = ["name", "slug", "size", "quantity", "price", "created_at", "updated_at"]
    list_display_links = list_display





class SubProductImageInline(TabularInlineBase):
    model = products_models.SubProductImage



@admin.register(products_models.Product)
class ProductAdmin(admin.ModelAdmin):
    ordering = ["-created_at"]
    search_fields = ["name",]
    readonly_fields = ["slug", "created_at", "updated_at", "avg_rating", "no_of_reviews", "no_of_views"]
    list_display = ["name", "slug", "wholesale_price", "avg_rating", "no_of_reviews", "no_of_views", "created_at", "updated_at"]
    list_display_links = list_display



@admin.register(products_models.SubProduct)
class SubProductAdmin(admin.ModelAdmin):
    ordering = ['-created_at']
    search_fields = ['sku', 'color', 'sizes', "no_of_sold", "is_out_of_stock", 'wholesale_price']
    readonly_fields = ["no_of_sold", "created_at", "updated_at"]
    list_display = ["sku", 'color', "wholesale_price", "no_of_sold", "is_out_of_stock", "created_at", "updated_at"]
    list_display_links = list_display
    inlines = [SubProductImageInline]
