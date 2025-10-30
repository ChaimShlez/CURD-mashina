from flask import request
import os
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

from dotenv import load_dotenv
load_dotenv()

def verify_token():
    jwt_token = request.cookies.get('access_token')
    if not jwt_token:
        return None
    secret = os.getenv('SECRET_KEY')
    algorithm = "HS256"

    try:
        payload = jwt.decode(jwt_token, secret, algorithms=[algorithm])
        return payload
    except ExpiredSignatureError:
      return "JWT token has expired."
    except InvalidTokenError:
        return "Invalid JWT token."
    except Exception as e:
        return f"An error occurred: {e}"



EXEMPT_ROUTES = ['/login', '/register' ,"/getEmployees"]

def verify():

    if request.path in EXEMPT_ROUTES:
        return True
    payload=verify_token()
    if payload:
        return True
    else:
        return False



