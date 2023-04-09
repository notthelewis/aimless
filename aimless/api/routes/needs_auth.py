from flask import Blueprint, render_template

needsauth = Blueprint('needsauth', __name__)


@needsauth.route('/needs-auth', methods=["GET"])
def auth():
    return render_template('401.html')
