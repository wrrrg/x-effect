import os

from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html', **{
        'environment': os.environ.get('FLASK_ENV')})


@app.route('/test')
def test():
    return 'OK'


if __name__ == '__main__':
    app.run()
