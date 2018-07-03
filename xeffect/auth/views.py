from .models import User
from flask import Blueprint, request, jsonify
from xeffect.utils import decode_jwt_and_check_if_expired, generate_jwt

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    req = request.json
    try:
        User.objects.get(email=req['email'].lower())
        return jsonify({'success': False,
                        'message': 'Email already exists. Try logging in.'})
    except User.DoesNotExist:
        new_user = User(
            first_name=req['first_name'],
            last_name=req['last_name'],
            email=req['email'].lower(),
        ).set_password(password=req['password']).save()
        return jsonify({'success': True,
                        'jwt': generate_jwt(new_user.get_id())})


@auth_bp.route('/login', methods=['POST'])
def login():
    req = request.json
    try:
        user = User.objects.get(email=req['email'].lower())
        return jsonify({'success': True, 'jwt': generate_jwt(user.get_id())})
    except User.DoesNotExist:
        return jsonify(
            {"success": False,
             "message": "An account with this email does not exist."})
    except User.MultipleObjectsReturned:
        # something has gone horribly wrong. why would there be more than one?
        return jsonify({"success": False, "message": "We can not log you in."})


@auth_bp.route('/authenticate', methods=['POST'])
def authenticate():
    req = request.json
    expired, _ = decode_jwt_and_check_if_expired(req['token'])
    if expired:
        return jsonify({'success': False})
    else:
        return jsonify({'success': True})
