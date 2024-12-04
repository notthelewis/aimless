from flask import Blueprint, render_template

wideopen = Blueprint('wideopen', __name__)


@wideopen.route('/wide-open')
def wide_open():
    return render_template('200.html')
