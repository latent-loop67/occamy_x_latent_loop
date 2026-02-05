# okami/tokens.py
import jwt
import datetime
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()

# Secret key from settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = 'HS256'

# JWT Token Helper Functions
def create_jwt_token(user, expiry_minutes=60):
    """
    Generate JWT token for a given user.
    """
    payload = {
        'user_id': user.id,
        'email': user.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=expiry_minutes),
        'iat': datetime.datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def decode_jwt_token(token):
    """
    Decode JWT token and return payload or raise exception if invalid/expired.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user = User.objects.get(id=payload['user_id'])
        return user
    except jwt.ExpiredSignatureError:
        raise Exception("Token has expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")
    except User.DoesNotExist:
        raise Exception("User not found")

# OTP Generation & Verification 
import random

def generate_otp(length=6):
    """
    Generate a numeric OTP of given length.
    """
    otp = ''.join([str(random.randint(0, 9)) for _ in range(length)])
    return otp
