# Using exchangeratesapi.io API
import requests

# https://stackoverflow.com/questions/2356925/how-to-check-whether-string-might-be-type-cast-to-float-in-python
def isfloat(string):
    try:
        float(string)
        return True
    except ValueError:
        return False

while True:
    base = input("Curreny(3 letters symbol): ")
    if len(base) == 3 and base.isalpha():
        break
    print("unsupported input")
while (base != None):
    another = input("Another Curreny(3 letters symbol): ")
    if len(another) == 3 and another.isalpha():
        break
    print("unsupported input")
base = base.upper()
another = another.upper()
# no convertion needed
if base == another:
    print("No convertion needed.")
    exit()
while another != None:
    value = input("How much " + base + " : ")
    if isfloat(value):
        value = float(value)
        break
    print("invalid input")
res = requests.get("https://api.exchangeratesapi.io/latest", params={"base": base, "symbols": another})
if res.status_code != 200:
    print(res.status_code)
    raise Exception("API request error")
obj = res.json()
try:
    rate = obj['rates'][another]
except (RuntimeError, TypeError, ValueError, KeyError):
    print("Rate not exist")
amount = value * rate
date = obj['date']
if obj["base"] == base:
    print(f"{value} {base} is about {amount} {another} at {date}.")
else:
    raise Exception("API request error")
print("Powered by https://exchangeratesapi.io/")