from django.contrib import admin
from apps.common.models import Enquiry
# Register your models here.



class EnquiryAdmin(admin.ModelAdmin):
    search_fields = ["name","email","mobile"]
    list_display = ["name","email","mobile","created_at"]
    list_display_links = list_display

admin.site.register(Enquiry, EnquiryAdmin)