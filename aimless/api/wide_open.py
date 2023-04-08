from flask import Flask, request, render_template

@app.route('/wide-open', methods=["GET"])
def open():
    return render_template('200.html')