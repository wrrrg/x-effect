from werkzeug.security import check_password_hash, generate_password_hash
from xeffect.utils import AuditableModel
from mongoengine import Document, StringField, EmailField, BooleanField


class User(Document, AuditableModel):
    first_name = StringField(max_length=200, required=True)
    last_name = StringField(max_length=200, required=True)
    email = EmailField(max_length=200, required=True)
    password = StringField(max_length=200, default=None)
    email_auth = BooleanField(default=False)
    facebook_auth = BooleanField(default=False)
    google_auth = BooleanField(default=False)

    meta = {'db_alias': 'default', 'collections': 'users'}

    EMAIL = "email"
    GOOGLE = "google"
    FACEBOOK = "facebook"
    SOCIAL_ACCOUNTS = (GOOGLE, FACEBOOK)

    def set_password(self, password):
        self.password = generate_password_hash(password)
        return self

    def check_password(self, password):
        if self.password is None:
            return False
        return check_password_hash(self.password, password)

    def set_auth(self, type):
        if type == self.EMAIL:
            self.email_auth = True
        elif type == self.GOOGLE:
            self.google_auth = True
        elif type == self.FACEBOOK:
            self.facebook_auth = True
        return self
