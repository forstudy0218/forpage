import os
import requests
from datetime import datetime, timedelta, date
from pytz import timezone
from flask import Flask, redirect, render_template, request
from flask_sqlalchemy import SQLAlchemy
from xml.etree import ElementTree
from math import log10
# There was a bug in psycopg2 2.7.1. Causing KeyError. Fixed after update to 2.7.3.2
# It took me 12+ hours to find the solution, haha!
# Web app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URL']
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

# Check if string a float
def isfloat(string):
        try:
            float(string)
            return True
        except ValueError:
            return False

# function for long division
def isint(num): # don't use it with string
    if float(num) == int(num):
        return True
    else:
        return False
# moving decimal point to right
def movdec(numstr):
    if isfloat(numstr):
        # no XXXXX.0 or XXXXX.XXXX00000
        num = float(numstr)
        if float(num) == int(num):
            # XXX.0 case
            num = int(num)
            numstr = str(num) # integer string with no decimal
        else:
            # XXXX.XXXXXX case
            numstr = str(num)
        if "." in numstr:
            # if str have decimal point, split it
            numstrlist = numstr.split(".")
            if numstrlist[1][1:] != "":
                numstr = numstrlist[0] + numstrlist[1][0] + "." + numstrlist[1][1:]
                num = float(numstr)
            else:
                # num become integer now
                numstr = numstrlist[0] + numstrlist[1][0]
                num = int(numstr)
            numstr = str(num)
        else:
            # numstr is integer
            numstr = str((int(numstr)) * 10)
        return numstr
    else:
        raise ValueError
        return numstr

@app.before_request
def get_redirect():
    if "cs50.xyz" in request.url:
        return
    if not request.is_secure and \
       not request.headers.get('X-Forwarded-Proto', 'http') == 'https' and \
       request.method == 'GET' and request.url.startswith('http://'):
        url = request.url.replace('http://', 'https://', 1)
        r = redirect(url, code=301)
        return r

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

@app.route("/map_for_test")
def testing_map():
    return render_template("map.html")

@app.route("/repeat_simulator")
def repeat_simulator():
    return render_template("repeat_simulator.html")
    
@app.route("/download_page")
def download_page():
    return render_template("download_page.html")
    
@app.route("/onw")
def one_night():
    return render_template("one_night_wolf.html")

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
            return redirect("/")
        return render_template("convert.html", rlist=rlist, slist=slist, date=row.date)
    if request.method == "POST":
        base = request.form.get("base")
        another = request.form.get("another")
        value = request.form.get("value")
        if len(another) != 3 or not another.isalpha() or len(base) != 3 or not base.isalpha() or not isfloat(value):
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
            # use / for returns a floating point number; // is for floor division.
            value = value / bdata.rates
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
        # Round
        amount = round(amount, 2)
        # convert value back to origin if base is not EUR
        if base != "EUR":
            value = request.form.get("value")
        return render_template("converted.html", value=value, base=base, amount=amount, another=another, date=date)

@app.route("/decimal", methods=["GET", "POST"])
def decimal():
    if request.method == "GET":
        return render_template("dform.html")
    if request.method == "POST":
        # Two strings arrive
        dividend_in = dividend_out = request.form.get("dividend")
        divisor_in = divisor_out = request.form.get("divisor")
        # not float input
        if not isfloat(dividend_in) or not isfloat(divisor_in):
            error = 1
            return render_template("dresult.html", error=error)
        # Validate input
        dividend = float(dividend_in)
        divisor = float(divisor_in)
        # cannot divide 0
        if dividend < 0 or divisor <= 0:
            error = 2
            return render_template("dresult.html", error=error)
        if "e" in (str(dividend)):
            # origin input too little
            # origin input too little, like 0.0000000XXXXXX or 0.0000000XXXXXX00000000000
            # take away trailing zero
            dividend_in = dividend_in.rstrip('0')
            # Don't deal with 0.00000000XXXXX here
        # Take away the decimal point in divisor
        # divisor can be XXXX.XXXX or XXXX.0 or 0.XXXXX or integer without ".0"
        sorstr = str(divisor)
        # prepare to grow dividend
        endstr = str(dividend)
        if "e" in endstr:
            # use input
            endstr = dividend_in
        if ("e" in sorstr):
            # origin input too little, like 0.0000000XXXXXX or 0.0000000XXXXXX00000000000
            # take away trailing zero
            divisor_in = divisor_in.rstrip('0')
            # growth dividend for division to find quotient
            # divisor_in is 0.0000000XXXXXX
            growth = len(divisor_in) - 2
            for i in range(growth):
                endstr = movdec(endstr)
            # take away leading zero
            sorstr = divisor_in.lstrip('0.')
            sor = int(sorstr)
        elif ("." in sorstr):
            sor = float(sorstr)
            while not isint(sor): # not integer
                # Growing
                sorstr = movdec(sorstr)
                endstr = movdec(endstr)
                sor = float(sorstr)
            sor = int(sor)
        # divisor is integer
        else:
            sor = int(sor)
        dividend = float(endstr)
        if isint(dividend):
            dividend = int(dividend)
        # sor is always integer without".0" now
        # redo everything from beginning, sigh~
        # begin long division
        temp = str(dividend)
        if "e" in temp:
            # dividend still too little
            temp = endstr # use 0.0000XXX format
        # prepare quotient list
        quolist = []
        # prepare remainder list
        relist = []
        # set max looptime
        looptime = max((len(divisor_in) + len(dividend_in)), 10)
        count = 0
        # Dividend can be 0.XXXXXXXXXX or integer or XXXXXXX.XXXXXXXXX
        # Need to find the position for first digit of dividend
        dig = 0
        remainder = 1
        endpos = 0
        # Need to know when to add . for quotient
        pointcheck = 0
        # Prepare list of Padding prototypes for relist
        padlist = []
        padding = 0
        # some bug
        bugfix = 0
        # Add padding for origin input
        for i in dividend_out:
            # Add any for leading zero
            if i == "0":
                padding += 1
            elif i != ".":
                break
        for i in range(len(temp)):
            endpos = i
            # Not first digit
            if temp[i] == ".":
                quolist.append(".")
                quolist.append("0")
            elif temp[i] == "0":
                quolist.append("0")
            else:
                # found
                remainder = int(temp[i]) # treat as remainder
                # First time bigger
                if sor <= remainder:
                    count += 1
                    quodig = remainder // sor
                    quolist.append(str(quodig))
                    relist.append(quodig * sor)
                    # Add padding to this row
                    rel = int(log10(remainder))
                    padding += rel - int(log10(quodig * sor))
                    padlist.append(padding)
                    remainder = remainder - (quodig * sor)
                    if remainder != 0:
                        relist.append(remainder)
                        # Add padding to this row
                        padding += rel - int(log10(remainder))
                        padlist.append(padding)
                    else:
                         padding += rel + 1
                         if endpos != (len(temp) - 1):
                             if temp[endpos + 1] == "0":
                                 padding += 1
                                 bugfix = 1
                while sor > remainder and (count < looptime):
                    count += 1
                    endpos += 1
                    if endpos <= (len(temp) - 1):
                        # can take sommeting, maybe "."
                        if temp[endpos] == ".":
                            quolist.append(".")
                        else:
                            nextdig = int(temp[endpos])
                            remainder = remainder * 10 + nextdig
                            if remainder == 0:
                                quolist.append("0")
                                if endpos == (len(temp) - 1):
                                    break
                            elif sor > remainder:
                                quolist.append("0")
                            else:
                                # renew last remainder, hope no bug
                                if len(relist) > 1:
                                    relist[len(relist) - 1] = remainder
                                quodig = remainder // sor
                                quolist.append(str(quodig))
                                relist.append(quodig * sor)
                                # Add padding to this row
                                rel = int(log10(remainder))
                                padding += rel - int(log10(quodig * sor))
                                padlist.append(padding)
                                remainder = remainder - (quodig * sor)
                                if remainder != 0:
                                    relist.append(remainder)
                                    # Add padding to this row
                                    padding += rel - int(log10(remainder))
                                    padlist.append(padding)
                                else:
                                    relist.append(remainder)
                                    # Add padding to this row
                                    padding += rel +1
                                    padlist.append(padding)
                    else:
                        if pointcheck == 0:
                            pointcheck = 1
                            if not "." in quolist:
                                quolist.append(".")
                        # nothing to take
                        remainder *= 10
                        if remainder == 0:
                            break
                        elif sor > remainder:
                            quolist.append("0")
                        else:
                            # renew last remainder, hope no bug
                            if len(relist) > 1:
                                relist[len(relist) - 1] = remainder
                            if bugfix == 1:
                                    relist.append(remainder)
                                    padlist.append(padding)
                                    bugfix = 2
                            quodig = remainder // sor
                            quolist.append(str(quodig))
                            relist.append(quodig * sor)
                            # Add padding to this row
                            rel = int(log10(remainder))
                            padding += rel - int(log10(quodig * sor))
                            padlist.append(padding)
                            remainder = remainder - (quodig * sor)
                            if remainder == 0:
                                break
                            else:
                                relist.append(remainder)
                                # Add padding to this row
                                padding += rel - int(log10(remainder))
                                padlist.append(padding)
                break
        if relist[len(relist) - 1] == 0:
            del relist[-1]
            del padlist[-1]
        if (len(quolist) > 1):
            quostr = "".join(quolist)
        else:
            quostr = quolist[0]
        quo = float(quostr)
        if isint(quo):
            quo = int(quo)
        padstr = str(quo)
        if "e" in padstr:
            # quo too little
            padstr = quostr
            if padstr[0] == ".":
                padstr = "0" + quostr
        # Find quotient padding
        firstrowlength = padlist[0] + int(log10(relist[0]))
        # Find the first sig. fig.
        padcount = 0
        for i in padstr:
            if i == "0":
                padcount += 1
            elif i != ".":
                break
        quopad = firstrowlength - padcount if firstrowlength >= padcount else 0
        if len(padlist) != len(relist):
            error = 4
            return render_template("dresult.html", error=error)
        error = 0
        return render_template("dresult.html", error=error, quo=padstr, divisor=divisor_out, dividend=dividend_out, relist=relist, padding=quopad, padlist=padlist)

@app.route("/imgsearch", methods=["GET"])
def picsearch():
    if request.method == "GET":
        return render_template("picture.html")
    else:
        return redirect("/")

@app.route("/werewolf", methods=["GET"])
def werewolf():
    return render_template("werewolf.html")

@app.route("/sudoku", methods=["GET"])
def sudoku():
    return render_template("sudoku.html")

@app.route("/enwerewolf", methods=["GET"])
def enwerewolf():
    return render_template("enwerewolf.html")

if __name__ == '__main__':
    app.run()