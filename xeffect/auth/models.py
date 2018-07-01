from werkzeug.security import check_password_hash, generate_password_hash
from xeffect.utils import AuditableModel
from mongoengine import Document, StringField, EmailField


class User(Document, AuditableModel):
    first_name = StringField(max_length=200, required=True)
    last_name = StringField(max_length=200, required=True)
    email = EmailField(max_length=200, required=True)
    password = StringField(max_length=200)

    meta = {'db_alias': 'default', 'collections': 'users'}

    def set_password(self, *args, **kwargs):
        if 'password' in kwargs:
            self.password = generate_password_hash(kwargs['password'])
        else:
            raise Exception("Must include password")
        return self

    def check_password(self, *args, **kwargs):
        if 'password' in kwargs:
            return self.password == check_password_hash(kwargs['password'])
