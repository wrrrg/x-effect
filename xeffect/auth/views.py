from .models import User
from flask import Blueprint, request, jsonify, current_app
from xeffect.utils import decode_jwt_and_check_if_expired, generate_jwt

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    req = request.json
    try:
        user = User.objects.get(email=req["email"].lower())
        if not user.email_auth:
            user.set_password(password=req["password"]) \
                              .set_auth(User.EMAIL).save()
        else:
            return jsonify({
                "success": False,
                "message": ("An account with that email already exists. "
                            "Try logging in.")})
    except User.DoesNotExist:
        user = User(
            first_name=req["first_name"],
            last_name=req["last_name"],
            email=req["email"].lower(),
        ).set_password(password=req["password"]).set_auth(User.EMAIL).save()
    return jsonify({"success": True,
                    "jwt": generate_jwt(user.get_id())})


@auth_bp.route("/login", methods=["POST"])
def login():
    req = request.json

    try:
        user = User.objects.get(email=req["email"].lower())
        valid_user = user.check_password(req["password"]) \
            if req["type"] == User.EMAIL else True
        return (jsonify({"success": False,
                         "message": "Incorrect Email or Password"}),
                jsonify({"success": True,
                         "jwt": generate_jwt(user.get_id())}))[valid_user]

    except User.DoesNotExist:
        if req["type"] in User.SOCIAL_ACCOUNTS:
            user = User(
                first_name=req["first_name"],
                last_name=req["last_name"],
                email=req["email"].lower()
            ).set_auth(req["type"]).save()
            return jsonify({"success": True,
                            "jwt": generate_jwt(user.get_id())})
        return jsonify({"success": False, "message": "Account does not exist"})

    except User.MultipleObjectsReturned:
        # something has gone horribly wrong. why would there be more than one?
        return jsonify({"success": False,
                        "message": "An error occurred in your account"})


@auth_bp.route("/authenticate", methods=["POST"])
def authenticate():
    req = request.json
    expired, _ = decode_jwt_and_check_if_expired(req["token"])
    if expired:
        return jsonify({"success": False})
    else:
        return jsonify({"success": True})


@auth_bp.route("/social_clients", methods=["GET"])
def social_clients():
    return jsonify({
        "fb_app_id": current_app.config['FACEBOOK_APP_ID'],
        "google_client_id": current_app.config['GOOGLE_CLIENT_ID']
    })
