import os
import sys
from .shelltools import all_models
from mongoengine import connect
from xeffect import create_app


curr_dir = os.getcwd()
if curr_dir not in sys.path:
    sys.path.append(curr_dir)


app = create_app()
db = connect(**app.config['MONGO_SETTINGS'])


@app.shell_context_processor
def ctx():
    return dict(db=db, app=app, **all_models)


if __name__ == '__main__':
    app.run()
