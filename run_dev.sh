#!/bin/bash
export FLASK_ENV=development
yarn run start & FLASK_APP=app.py flask run
