import os
import time
import datetime

cities = [
    "bangalore",
    "pune",
    "andhra"
]

while True:
    for cmd in [f"python {city}.py" for city in cities]:
        os.system(cmd)
    print(f'Last run at {datetime.datetime.now().isoformat()}')
    time.sleep(3600)
