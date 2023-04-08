from flask import Flask, request, render_template

app = Flask(__name__)

class needs_auth:
    @app.route('/needs-auth', methods=["GET"])
    def auth():
        return render_template('401.html')
