from coreAPI.settings.base import *



print(env("DEV_PHASE"))

if env("DEV_PHASE")=="prod":
    if DEBUG:
        DATABASES = {
            "default": {
                "ENGINE": env("DEV_DB_ENGINE"),
                "NAME": env("DEV_DB_NAME"),
                "USER": env("DEV_DB_USER"),
                "PASSWORD": env("DEV_DB_PASS"),
                "HOST": env("DEV_DB_HOST"),
                "PORT": env("DEV_DB_PORT"),
            }
        }
        STATIC_ROOT = "/var/www/innerkomfort/innerkomfort_prod_api/staticfiles/"
        MEDIA_ROOT = "/var/www/innerkomfort/innerkomfort_prod_api/mediafiles/"
        
        # Test Razorpay settings
        RAZORPAY_KEY_ID = env("RAZORPAY_TEST_KEY_ID")
        RAZORPAY_KEY_SECRET = env("RAZORPAY_TEST_KEY_SECRET")
        RAZORPAY_WEBHOOK_KEY_SECRET = env("RAZORPAY_WEBHOOK_KEY_SECRET")
    else:
        DATABASES = {
            "default": {
                "ENGINE": env("PROD_DB_ENGINE"),
                "NAME": env("PROD_DB_NAME"),
                "USER": env("PROD_DB_USER"),
                "PASSWORD": env("PROD_DB_PASS"),
                "HOST": env("PROD_DB_HOST"),
                "PORT": env("PROD_DB_PORT"),
            }
        }
        STATIC_ROOT = "/var/www/innerkomfort/innerkomfort_prod_api/staticfiles/"
        MEDIA_ROOT = "/var/www/innerkomfort/innerkomfort_prod_api/mediafiles/"
        
        # Live Razorpay settings
        RAZORPAY_KEY_ID = env("RAZORPAY_LIVE_KEY_ID")
        RAZORPAY_KEY_SECRET = env("RAZORPAY_LIVE_KEY_SECRET")
        RAZORPAY_WEBHOOK_KEY_SECRET = env("RAZORPAY_WEBHOOK_KEY_SECRET")
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
    STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
    MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")
    
    # Test Razorpay settings
    RAZORPAY_KEY_ID = env("RAZORPAY_TEST_KEY_ID")
    RAZORPAY_KEY_SECRET = env("RAZORPAY_TEST_KEY_SECRET")
    RAZORPAY_WEBHOOK_KEY_SECRET = env("RAZORPAY_WEBHOOK_KEY_SECRET")

# Async Email Backend Settings
# EMAIL_BACKEND = env("CLRYPROD_EMAIL_BACKEND")
# EMAIL_HOST = env("CLRYPROD_EMAIL_HOST")
# EMAIL_USE_TLS = env("CLRYPROD_EMAIL_USE_TLS")
# EMAIL_PORT = env("CLRYPROD_EMAIL_PORT")
# EMAIL_HOST_USER = env("CLRYPROD_EMAIL_HOST_USER")
# EMAIL_HOST_PASSWORD = env("CLRYPROD_EMAIL_HOST_PASSWORD")
# EMAIL_FROM = env("CLRYPROD_EMAIL_FROM")

# Production Email
EMAIL_BACKEND = env("PROD_EMAIL_BACKEND")
EMAIL_HOST = env("PROD_EMAIL_HOST") 
EMAIL_PORT = env("PROD_EMAIL_PORT")
EMAIL_USE_TLS = env("PROD_EMAIL_USE_TLS")
EMAIL_HOST_USER = env("PROD_EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("PROD_EMAIL_HOST_PASSWORD")
EMAIL_FROM = env("PROD_EMAIL_FROM")


