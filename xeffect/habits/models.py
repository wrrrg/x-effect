import arrow

from bson import ObjectId
from mongoengine import (
    Document, EmbeddedDocument, ListField, SortedListField,
    EmbeddedDocumentField, ReferenceField, BooleanField, StringField,
    DateTimeField, ObjectIdField
)
from xeffect.utils import AuditableModel
from xeffect.auth.models import User

GOAL_CHOICES = ("daily")


class Goal(EmbeddedDocument, AuditableModel):
    label_text = StringField(max_length=1024, required=True)
    id = ObjectIdField(default=ObjectId)

    meta = {'allow_inheritance': True}


class DailyGoal(Goal):
    type = StringField(choices=GOAL_CHOICES, required=True)


class Habit(Document, AuditableModel):
    name = StringField(max_length=1024, required=True)
    past_goals = ListField(EmbeddedDocumentField(Goal))
    user = ReferenceField(User, required=True)
    public = BooleanField(required=True)
    x_list = SortedListField(StringField())
    daily_goal = EmbeddedDocumentField(Goal)
    start_date = DateTimeField(required=True)
    end_date = DateTimeField(default=None)

    def create_habit(self, user, **kwargs):
        start_date, end_date = map(
            lambda x: arrow.get(x).datetime if x else None,
            (kwargs.get('start_date'), kwargs.get('end_date')))

        if kwargs.get('type') == "daily":
            new_daily_goal = DailyGoal(
                type=kwargs.get('type'), label_text=kwargs.get('label_text'))
            self.daily_goal = new_daily_goal

        self.user = user
        self.name = kwargs.get('name')
        self.start_date = start_date or arrow.now().datetime
        self.public = kwargs.get('public')
        self.end_date = end_date
        return super(Habit, self).save()
