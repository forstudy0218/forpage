import requests
from datetime import datetime
from pytz import timezone
from flask import Flask, redirect, render_template, request, flash

# Web app
app = Flask(__name__)


@app.after_request
def after_request(response):
    """Disable caching"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

# converter
@app.route("/convert", methods=["GET", "POST"])
# https://stackoverflow.com/questions/2356925/how-to-check-whether-string-might-be-type-cast-to-float-in-python
def convert():
    # ask for thing
    if request.method == "GET":
        return render_template("convert.html")
    if request.method == "POST":
        def isfloat(string):
            try:
                float(string)
                return True
            except ValueError:
                return False
        base = request.form.get("base")
        another = request.form.get("another")
        value = request.form.get("value")
        if len(another) != 3 or not another.isalpha() or len(base) != 3 or not base.isalpha() or not isfloat(value):
            flash('Input Error.')
            return render_template("convert.html")
        if base == another:
            return render_template("converted.html", value=value, base=base, amount=value, another=another, date="'today'")
        value = float(value)
        # API from exchangeratesapi.io
        res = requests.get("https://api.exchangeratesapi.io/latest", params={"base": base, "symbols": another})
        if res.status_code != 200:
            print(res.status_code)
            raise Exception("API request error")
            flash("Error from converter.")
            return render_template("convert.html")
        obj = res.json()
        try:
            rate = obj['rates'][another]
        except (RuntimeError, TypeError, ValueError, KeyError):
            print("Rate not exist")
            flash("Error from database.")
            return render_template("convert.html")
        amount = value * rate
        date = obj['date']
        if obj["base"] == base:
            return render_template("converted.html", value=value, base=base, amount=amount, another=another, date=date)
        else:
            flash("Error from database.")
            return render_template("convert.html")

if __name__ == '__main__':
    app.run()