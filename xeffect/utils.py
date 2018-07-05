import arrow
import jwt
from flask import current_app
from mongoengine import (
    DateTimeField, ListField, EmbeddedDocumentField, DictField,
    ComplexDateTimeField, StringField, FloatField, IntField, BooleanField,
    ObjectIdField, DecimalField, EmbeddedDocument, ReferenceField, QuerySet
)


# 1 day long
TOKEN_EXPIRATION = 86400
CONVERT_MAP = {
    ListField.__name__: lambda data: _list_field_to_dict(data),
    EmbeddedDocumentField.__name__: lambda data: mongo_to_dict(data),
    EmbeddedDocument.__name__: lambda data: mongo_to_dict(data),
    DictField.__name__: lambda data: data,
    DateTimeField.__name__: lambda data: arrow.get(data).for_json(),
    ComplexDateTimeField.__name__: lambda data: arrow.get(data).for_json(),
    StringField.__name__: lambda data: str(data),
    FloatField.__name__: lambda data: float(data),
    IntField.__name__: lambda data: int(data),
    BooleanField.__name__: lambda data: bool(data),
    ObjectIdField.__name__: lambda data: str(data),
    DecimalField.__name__: lambda data: data,
    ReferenceField.__name__: lambda data: mongo_to_dict(data),
    "other": lambda data: str(data)
}


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
    return diff.seconds >= TOKEN_EXPIRATION, decoded_token


def generate_jwt(user_id):
    return jwt.encode({'iat': arrow.now().datetime, 'sub': user_id},
                      current_app.config['JWT_SECRET_TOKEN'],
                      algorithm='HS256').decode('utf-8')


def mongo_to_dict(obj):
    if isinstance(obj, list) or isinstance(obj, QuerySet):
        return_dict = {}
        for o in obj:
            return_dict.update(_mongo_parser(o))
        return return_dict
    else:
        return _mongo_parser(obj)


def _get_map_key(field):
    field = field.__class__.__name__
    return ("other", field)[field in CONVERT_MAP.keys()]


def _mongo_parser(obj):
    return_data = {}

    if obj is None:
        return None

    for field_name in obj._fields:
        if field_name == "password":
            continue
        field = obj._fields[field_name]
        key = _get_map_key(field)
        data = obj._data[field_name]
        return_data[field_name] = CONVERT_MAP[key](data)

    return return_data


def _list_field_to_dict(list_field):
    return_data = []

    for item in list_field:
        key = _get_map_key(item)
        return_data.append(CONVERT_MAP[key](item))

    return return_data
