# import datetime
# import uuid
# from django.conf import settings
# from django.utils import timezone
from django.db import models
from django.utils.text import slugify
from django.utils.translation import gettext_lazy as _


from apps.common import models as common_models
from apps.products import utils as products_utils




class Tag(common_models.TimeStampModel):
    name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("Name"))
    slug = models.SlugField(max_length=255, null=True, blank=True, verbose_name=_("Slug"))
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Tag, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Tag"
        verbose_name_plural = "Tags"
        db_table = "tags"



class Category(common_models.TimeStampModel):
    name = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("Category Name"))
    slug = models.SlugField(max_length=255, null=True, blank=True, verbose_name=_("Category Slug"))
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Category, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
        db_table = "categories"



class SubCategory(common_models.TimeStampModel):
    category = models.ForeignKey(Category, on_delete = models.CASCADE, verbose_name=_("Main Category"))
    name = models.CharField(max_length=64, verbose_name=_("Sub Category Name"))
    slug = models.SlugField(max_length=255, null=True, blank=True, verbose_name=_("Sub Category Slug"))
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(SubCategory, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name}-{self.name}"

    class Meta:
        verbose_name = "Sub Category"
        verbose_name_plural = "Sub Categories"
        db_table = "subcategories"



class Product(common_models.TimeStampModel):
    STATUS_CHOICES = (
        ("Draft", "Draft",),
        ("Published", "Published",),
    )
    name = models.CharField(max_length=64, verbose_name=_("Product Name"))
    slug = models.SlugField(max_length=255, null=True, blank=True, verbose_name=_("Product Slug"))
    description = models.CharField(max_length=255, verbose_name=_("Product Description"))
    category = models.ForeignKey(Category, on_delete = models.CASCADE, verbose_name=_("Category"))
    sub_category = models.ForeignKey(SubCategory, on_delete = models.CASCADE, null=True, blank=True, verbose_name=_("Sub Category"))
    tag = models.ManyToManyField(Tag, blank=True, verbose_name=_("Tags"))
    wholesale_price = models.PositiveBigIntegerField(default=0, verbose_name=_("Wholesale Price"), blank=True, null=True)
    shipping_charges = models.PositiveBigIntegerField(default=0, null=True, blank=True, verbose_name=_("Shipping Charges"))
    return_policy = models.CharField(max_length=64, null=True, blank=True, verbose_name=_("Return Policy"))
    avg_rating = models.PositiveBigIntegerField(default=0, null=True, blank=True, verbose_name=_("Rating"))
    no_of_reviews = models.PositiveBigIntegerField(default=0, null=True, blank=True, verbose_name=_("No Of Reviews"))
    no_of_views = models.PositiveBigIntegerField(default=0, verbose_name=_("No. of Views"), blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    product_status  = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default="Draft", 
        verbose_name=_("Product Status"), 
        help_text="This ensures if Product added to Database or Not. Draft = Product added to DB, Pulished = Product added to DB also ready to Show on website.",
        null = True,
        blank = True
    )
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
        db_table = "products"



class SubProductsColor(common_models.TimeStampModel):
    name = models.CharField(max_length=20, verbose_name=_("Color Name"))
    slug = models.SlugField(max_length=255, null=True, blank=True, verbose_name=_("Color Slug"))
    code = models.CharField(max_length=20, verbose_name=_("Color Code"), blank=True, null=True)
    color_image = common_models.WEBPField(upload_to=products_utils.product_images_upload_path, blank=True, null=True, verbose_name=_("Color Image"))
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(SubProductsColor, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Sub Products Color"
        verbose_name_plural = "Sub Products Colors"
        db_table = "subproductscolors"


class SubProductsSize(common_models.TimeStampModel):
    name = models.CharField(max_length=20, default="Inch", verbose_name=_("Same Name"))
    slug = models.SlugField(max_length=255, null=True, blank=True, verbose_name=_("Size Slug"))
    size = models.PositiveSmallIntegerField(default=0, verbose_name=_("Size in No."))
    price = models.PositiveBigIntegerField(default=0, verbose_name=_("Regular Price"), blank=True, null=True)
    quantity = models.PositiveIntegerField(default=0, verbose_name=_("Quantity"), blank=True, null=True)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super(SubProductsSize, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.name}"

    class Meta:
        verbose_name = "Sub Products Size"
        verbose_name_plural = "Sub Products Sizes"
        db_table = "subproductssizes"



class SubProduct(common_models.TimeStampModel):
    product = models.ForeignKey(Product, on_delete = models.CASCADE, related_name = "product", verbose_name=_("Product"))
    sku = models.CharField(max_length=64, unique=True, verbose_name=_("Sub Product SKU"))
    color = models.OneToOneField(SubProductsColor, on_delete = models.CASCADE, related_name = "subproducts_colors", verbose_name=_("Color"))
    sizes = models.ManyToManyField(SubProductsSize, verbose_name=_("Size"))
    video_link = models.URLField(blank=True, null=True, verbose_name=_("Product Video Link"))
    wholesale_price = models.PositiveBigIntegerField(default=0, verbose_name=_("Wholesale Price"), blank=True, null=True)
    discount = models.PositiveIntegerField(default=0, verbose_name=_("Discount"), blank=True)
    no_of_sold = models.PositiveIntegerField(default=0, verbose_name=_("No Of Sold"), blank=True)
    is_out_of_stock = models.BooleanField(default=False, verbose_name=_("Is Out Of Stock"))
    meta_title = models.CharField(max_length=75, blank=True, null=True, verbose_name=_("Meta Title"))
    meta_description = models.CharField(max_length=160, blank=True, null=True, verbose_name=_("Meta Description"))
    meta_keyword = models.CharField(max_length=255, blank=True, null=True, verbose_name=_("Meta Keyword"))
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.color.name)
        super(SubProduct, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.product.name}-{self.color.name}-{self.sizes.name}"

    class Meta:
        verbose_name = "Sub Product"
        verbose_name_plural = "Sub Products"
        db_table = "subproducts"




class SubProductImage(common_models.TimeStampModel):
    subproduct = models.ForeignKey(
        SubProduct, on_delete=models.CASCADE, related_name="subproducts_images", verbose_name=_("Sub Product")
    )
    image = common_models.WEBPField(upload_to=products_utils.product_images_upload_path, verbose_name=_("Thumbnail"))

    class Meta:
        verbose_name = _("Sub Product Image")
        verbose_name_plural = _("Sub Product Images")
        db_table = "subproductimages"

    def __str__(self):
        return f"{self.subproduct.product.name}-{self.subproduct.color.name}-{self.subproduct.sizes.name}"



class ProductsView(common_models.TimeStampModel):
    ip = models.CharField(max_length=255, verbose_name=_("User IP Address"))
    product = models.ForeignKey(Product, related_name="product_views", on_delete=models.CASCADE)

    def __str__(self):
        return f"Total Views on - {self.product.name} is - {self.product.no_of_reviews} view(s)"

    class Meta:
        verbose_name = "Total Views on Product"
        verbose_name_plural = "Total Views on Products"
        db_table = "productsviews"



class FAQBase(common_models.TimeStampModel):
    question = models.TextField(unique=True, verbose_name=_("Question Title"))

    def __str__(self) -> str:
        return self.question

    class Meta:
        verbose_name = _("FAQ List")
        verbose_name_plural = _("FAQ List")
        db_table = "faqbases"


class ProductFAQ(common_models.TimeStampModel):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("Product"))
    faq_question = models.ForeignKey(FAQBase, on_delete=models.CASCADE, verbose_name=_("FAQ Question"))
    answer = models.TextField(verbose_name=_("FAQ Answer"))

    class Meta:
        verbose_name =_("Product FAQ")
        verbose_name_plural =_("Product FAQs")
        db_table = "product_faqs"

    def __str__(self):
        return f"{self.product.name} - {self.faq_question.question}"
