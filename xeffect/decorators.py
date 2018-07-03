from flask import request, jsonify, Response
from functools import wraps
from jwt.exceptions import DecodeError, InvalidTokenError
from xeffect.auth.models import User
from xeffect.utils import decode_jwt_and_check_if_expired


def auth_required(f):
    @wraps(f)
    def decorated_route(*args, **kwargs):
        if "Authorization" not in request.headers:
            return Response("Missing Authorization headers", status=401)
        parsed_auth = request.headers.get("Authorization").split(" ")
        if parsed_auth[0] != "Bearer" and len(parsed_auth) != 2:
            return Response(
                "The Authorization header in the request was malformed",
                status=400)
        try:
            expired, decoded_token = decode_jwt_and_check_if_expired(
                parsed_auth[1])
            if expired:
                return jsonify({"success": False})
            user = User.objects.get(id=decoded_token['sub'])
            kwargs['user'] = user
            return f(*args, **kwargs)
        except (DecodeError, InvalidTokenError):
            return Response("Token is invalid", status=400)
    return decorated_route
