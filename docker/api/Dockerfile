FROM python:3.8

RUN mkdir /var/app
WORKDIR /var/app
COPY ./requirements.txt ./requirements.txt
COPY ./api ./api

RUN apt-get update
RUN apt-get install -y binutils libproj-dev gdal-bin vim
RUN pip install -r requirements.txt

EXPOSE 80

CMD rm -r api/api/__pycache__ && \
    rm -r api/hospitals/__pycache__ && rm -r api/hospitals/migrations && \
    python api/manage.py makemigrations hospitals && python3 api/manage.py migrate && \
    python api/manage.py runserver 0.0.0.0:80