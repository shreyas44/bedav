import os
import time

cities = [
    "bangalore",
    "pune",
    "andhra"
]

while True:
    for cmd in [f"python {city}.py" for city in cities]:
        os.system(cmd)
    time.sleep(3600)
