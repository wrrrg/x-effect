import os
from logging.config import dictConfig

from . import config
from .auth.views import auth_bp
from .habits.views import habits_bp
from flask import Flask, render_template
from flask_cli import FlaskCLI


def create_app():
    dictConfig({
        'version': 1,
        'formatters': {'default': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        }},
        'handlers': {'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        }},
        'root': {
            'level': 'INFO',
            'handlers': ['wsgi']
        }
    })
    app = Flask(__name__, template_folder="../templates",
                static_folder="../static")
    FlaskCLI(app)
    app.config.from_object(config.get_config())
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(habits_bp, url_prefix="/api/habits")
    app.url_map.strict_slashes = False

    @app.route("/test")
    def test():
        return "OK"

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def index(path):
        return render_template("index.html", **{
            "environment": os.environ.get("FLASK_ENV")})

    return app
