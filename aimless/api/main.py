from flask import Flask, request, send_from_directory, render_template
import flask_restful
import flask_sqlalchemy
import flask_jwt_extended
import flask_cors

app = Flask(__name__)


@app.route('/needs-auth', methods=["GET"])
def auth():
    return render_template('401.html')


@app.route('/wide-open', methods=["GET"])
def open():
    return render_template('200.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port='42069', debug=True)
