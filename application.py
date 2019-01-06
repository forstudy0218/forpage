import os
import requests
from datetime import datetime, timedelta, date
from pytz import timezone
from flask import Flask, redirect, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
from xml.etree import ElementTree

# Web app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Get current time data
today = date.today()
# https://stackoverflow.com/questions/1712116/formatting-yesterdays-date-in-python
yesterday = date.today() - timedelta(1)
# check weekday
daynum = today.weekday()
# SQLAlchemy
db = SQLAlchemy()
db.init_app(app)
class Converter(db.Model):
    __tablename__ = "money"
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String, nullable=False)
    sym = db.Column(db.String)
    rates = db.Column(db.Float)

# Using method provided by exchangeratesapi
# https://github.com/exchangeratesapi/exchangeratesapi/blob/master/exchangerates/app.py
# only need GBP, HKD, JPY, USD
def update():
    # Get Data from European Central Bank
    url = ("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml")
    r = requests.get(url)
    envelope = ElementTree.fromstring(r.content)
    namespaces = {
        "gesmes": "http://www.gesmes.org/xml/2002-08-01",
        "eurofxref": "http://www.ecb.int/vocabulary/2002-08-01/eurofxref",
    }
    data = envelope.findall("./eurofxref:Cube/eurofxref:Cube[@time]", namespaces)
    # I only need the latest
    d = data[0]
    time = datetime.strptime(d.attrib["time"], "%Y-%m-%d").date()
    rates = {c.attrib["currency"]: (c.attrib["rate"]) for c in list(d)}
    symlist = ["GBP", "HKD", "JPY", "USD"]
    for symbol in symlist:
        rate = float(rates[symbol])
        # list of Converter
        rows = Converter.query.filter_by(sym = symbol).all()
        # first Converter
        row = rows[0]
        # use row.date, row.sym, row.rates to refer content
        # No entry
        if len(rows) == 0:
            print("Inserted")
            print(time, symbol, rate)
            # add new data
            new = Converter(date=time, sym=symbol, rates=rate)
            db.session.add(new)
        else:
            # not updated
            if time != row.date:
                print("Updated")
                print(time, symbol, rate)
                row.date = time
                row.rates = rate
            else:
                # no update
                print(f"No update needed for {symbol}.")
    db.session.commit()

@app.after_request
def after_request(response):
    """Disable caching"""
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response

@app.route("/")
def index():
    return render_template("index.html")

# converter
@app.route("/convert", methods=["GET", "POST"])
# https://stackoverflow.com/questions/2356925/how-to-check-whether-string-might-be-type-cast-to-float-in-python
def convert():
    # ask for thing
    if request.method == "GET":
        rows = Converter.query.all()
        row = rows[0]
        # check date
        if row.date != yesterday and row.date != today and daynum != 6 and daynum != 5:
                update()
                rows = Converter.query.all()
        # 1:"GBP", 2:"HKD", 3:"JPY", 4:"USD"
        slist = ["GBP", "HKD", "JPY", "USD"]
        rlist = []
        for i in rows:
            j = i.rates
            rlist.append(j)
        if len(slist) != len(rlist):
            flash("Error from database.")
            return redirect("/")
        return render_template("convert.html", rlist=rlist, slist=slist, date=row.date)
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
            return render_template("converted.html", value=value, base=base, amount=value, another=another, date=today)
        value = float(value)
        # Get data from db
        # If not EUR base; value not change if base is EUR
        if base != "EUR":
            bdata = Converter.query.filter_by(sym = base).first()
            date = bdata.date
            # Converter class
            value = value // bdata.rates
        # value is EUR now
        # If EUR another
        if another == "EUR":
            amount = value
        else:
            # Get data from datebase
            adata = Converter.query.filter_by(sym = another).first()
            date = adata.date
            rate = adata.rates
            amount = value * rate
            print(amount, value, rate)
        # convert value back to origin if base is not EUR
        if base != "EUR":
            value = request.form.get("value")
        return render_template("converted.html", value=value, base=base, amount=amount, another=another, date=date)

if __name__ == '__main__':
    app.run()