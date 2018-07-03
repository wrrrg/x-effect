from xeffect.habits.models import Habit, Goal, DailyGoal
from xeffect.auth.models import User

all_models = {
    'User': User,
    'Habit': Habit,
    'Goal': Goal,
    'DailyGoal': DailyGoal
}
