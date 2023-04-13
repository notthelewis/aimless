from flask import Flask, request, send_from_directory, render_template
import flask_restful
import flask_sqlalchemy
import flask_jwt_extended
import flask_cors

from routes.wide_open import wideopen
from routes.needs_auth import needsauth


def create_app():
    app = Flask(__name__)

    app.register_blueprint(wideopen)
    app.register_blueprint(needsauth)
    return app


if __name__ == "__main__":
    app = create_app()
    app.run()
