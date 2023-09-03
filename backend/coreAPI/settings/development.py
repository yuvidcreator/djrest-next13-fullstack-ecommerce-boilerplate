from  coreAPI.settings.base import *


print(env("DEV_PHASE"))
    
if env("DEV_PHASE") == "dev":
    if DEBUG:
        DATABASES = {
            "default": {
                "ENGINE": env("TEST_DB_ENGINE"),
                "NAME": env("TEST_DB_NAME"),
                "USER": env("TEST_DB_USER"),
                "PASSWORD": env("TEST_DB_PASS"),
                "HOST": env("TEST_DB_HOST"),
                "PORT": env("TEST_DB_PORT"),
            }
        }
    else:
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
    
    STATIC_ROOT = "/var/www/innerkomfort/innerkomfort_dev_api/staticfiles/"
    MEDIA_ROOT = "/var/www/innerkomfort/innerkomfort_dev_api/mediafiles/"
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
    STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
    MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")


# Async Email Backend Settings
# EMAIL_BACKEND = env("CLRY_EMAIL_BACKEND")
# EMAIL_HOST = env("CLRY_EMAIL_HOST")
# EMAIL_PORT = env("CLRY_EMAIL_PORT")
# EMAIL_USE_TLS = env("CLRY_EMAIL_USE_TLS")
# EMAIL_HOST_USER = env("CLRY_EMAIL_HOST_USER")
# EMAIL_HOST_PASSWORD = env("CLRY_EMAIL_HOST_PASSWORD")
# EMAIL_FROM = env("CLRY_EMAIL_FROM")

EMAIL_BACKEND = env("EMAIL_BACKEND")
EMAIL_HOST = env("EMAIL_HOST")
EMAIL_USE_TLS = env("EMAIL_USE_TLS")
EMAIL_PORT = env("EMAIL_PORT")
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")
EMAIL_FROM = env("EMAIL_FROM")


# Test Razorpay settings
RAZORPAY_KEY_ID = env("RAZORPAY_TEST_KEY_ID")
RAZORPAY_KEY_SECRET = env("RAZORPAY_TEST_KEY_SECRET")
RAZORPAY_WEBHOOK_KEY_SECRET = env("RAZORPAY_WEBHOOK_KEY_SECRET")