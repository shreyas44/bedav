FROM python:3.8

RUN mkdir /var/app
WORKDIR /var/app
COPY ./requirements.txt ./requirements.txt
COPY ./api ./api
COPY ./scripts ./scripts
COPY ./pull.py ./pull.py

RUN apt-get update
RUN apt-get install -y binutils libproj-dev gdal-bin vim
RUN pip install -r requirements.txt

CMD ["python", "pull.py"]