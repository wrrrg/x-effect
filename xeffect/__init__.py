import os

from . import config
from .auth.views import auth_bp
from .habits.views import habits_bp
from flask import Flask, render_template
from flask_cli import FlaskCLI


def create_app():
    app = Flask(__name__, template_folder='../templates',
                static_folder='../static')
    FlaskCLI(app)
    app.config.from_object(config.get_config())
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(habits_bp, url_prefix='/api/habits')
    app.url_map.strict_slashes = False

    @app.route('/test')
    def test():
        return "OK"

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        return render_template('index.html', **{
            'environment': os.environ.get('FLASK_ENV')})

    return app
