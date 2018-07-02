import arrow
import jwt
from flask import current_app
from mongoengine import DateTimeField

# 1 day long
TOKEN_EXPIRATION = 86400


class AuditableModel(object):
    created_at = DateTimeField(default=arrow.now().datetime)
    updated_at = DateTimeField(default=arrow.now().datetime)

    meta = {'allow_inheritance': True}

    def save(self, *args, **kwargs):
        if not self.created_at:
            self.created_at = arrow.now().datetime
        self.updated_at = arrow.now().datetime
        return super(AuditableModel, self).save(*args, **kwargs)

    def get_id(self):
        return str(self.id)


def decode_jwt_and_check_if_expired(encoded_token):
    decoded_token = jwt.decode(encoded_token,
                               current_app.config['JWT_SECRET_TOKEN'],
                               'HS256')
    diff = arrow.now().datetime - arrow.get(decoded_token['iat']).datetime
    return diff.seconds >= TOKEN_EXPIRATION


def generate_jwt(user_id):
    return jwt.encode({'iat': arrow.now().datetime, 'sub': user_id},
                      current_app.config['JWT_SECRET_TOKEN'],
                      algorithm='HS256').decode('utf-8')
