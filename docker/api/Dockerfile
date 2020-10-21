FROM python:3.8

RUN mkdir -p /var/app/api
WORKDIR /var/app/api
COPY ./api/requirements.txt ./requirements.txt
COPY ./api .

RUN apt-get update
RUN apt-get install -y binutils libproj-dev gdal-bin vim
RUN pip install -r requirements.txt

EXPOSE 80

CMD rm -rf api/__pycache__ && \
    rm -rf hospitals/__pycache__ && rm -rf hospitals/migrations && \
    python manage.py makemigrations hospitals && python manage.py migrate && \
    python manage.py runserver 0.0.0.0:80