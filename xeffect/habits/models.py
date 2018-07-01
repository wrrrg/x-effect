from mongoengine import Document, EmbeddedDocument, ListField, \
    SortedListField, EmbeddedDocumentField, ReferenceField, BooleanField, \
    StringField, DateTimeField
from xeffect.utils import AuditableModel
from xeffect.auth.models import User

GOAL_CHOICES = ("daily")


class Goal(EmbeddedDocument, AuditableModel):
    label_text = StringField(max_length=1024, required=True)
    x_list = SortedListField(DateTimeField())


class DailyGoal(Goal):
    type = StringField(choices=GOAL_CHOICES, required=True)


class Habit(Document, AuditableModel):
    name = StringField(max_length=1024, required=True)
    historical_goals = ListField(EmbeddedDocumentField(Goal))
    user = ReferenceField(User, required=True)
    public = BooleanField(required=True)
    daily_goal = EmbeddedDocumentField(Goal)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(default=None)
