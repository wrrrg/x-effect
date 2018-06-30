import os
import sys

from . import config
from .auth.views import bp as auth_bp
from flask import Flask, render_template
from mongoengine import connect

curr_dir = os.getcwd()
if curr_dir not in sys.path:
    sys.path.append(curr_dir)


# def create_app():
app = Flask(__name__, template_folder='../templates',
            static_folder='../static')

app.config.from_object(config.get_config())


db = connect(**app.config['MONGO_SETTINGS'])
# from . import db
# db.init_app(app)

app.register_blueprint(auth_bp)


@app.route('/test')
def test():
    return "Hello!"


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html', **{
        'environment': os.environ.get('FLASK_ENV')})


if __name__ == '__main__':
    app.run()