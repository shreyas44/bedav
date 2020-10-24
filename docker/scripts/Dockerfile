FROM python:3.8

RUN mkdir -p /var/app/scripts
WORKDIR /var/app/scripts
COPY ./scripts/requirements.txt ./requirements.txt
COPY ./api ../api
COPY ./scripts .

RUN apt-get update
RUN apt-get install -y binutils libproj-dev gdal-bin vim
RUN pip install -r requirements.txt

CMD python pull.py && sleep infinity
