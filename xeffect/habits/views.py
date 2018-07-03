import arrow

from flask import Blueprint, jsonify, request, Response
from .models import Habit
from xeffect.decorators import auth_required
from xeffect.utils import mongo_to_dict

habits_bp = Blueprint('habits', __name__)


@habits_bp.route("", methods=["POST", "GET"])
@auth_required
def habits(user):
    if request.method == "GET":
        habits = Habit.objects.filter(user=user). \
            select_related(max_depth=10)
        habits = mongo_to_dict(habits)
        habits["success"] = True if habits else False
        return jsonify(habits)
    elif request.method == "POST":
        new_habit = mongo_to_dict(
            Habit().create_habit(user=user, **request.json))
        new_habit["success"] = True
        return jsonify(new_habit)


@habits_bp.route("/x/<action>", methods=["POST"])
@auth_required
def update_habit_x(action, user):
    req = request.json
    try:
        habit = Habit.objects.get(id=req["id"]).select_related(max_depth=10)
        if "date" not in request.json:
            date_to_update = arrow.now().format("YYYY-MM-DD")
        else:
            date_to_update = arrow.get(
                request.json["date"]).format("YYYY-MM-DD")
        if action == "add":
            for x in habit.x_list:
                if x == date_to_update:
                    return jsonify({"success": False,
                                    "message": "Already marked as X"})
            habit.modify(push__x_list=date_to_update)
            habit = mongo_to_dict(habit)
            habit["success"] = True
            return jsonify(habit)
        elif action == "remove":
            habit.modify(pull__x_list=date_to_update)
            habit = mongo_to_dict(habit)
            habit["success"] = True
            return jsonify(habit)
    except (Habit.DoesNotExist, IndexError):
        return Response("Habit not found", status=404)
