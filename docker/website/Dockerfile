FROM node:slim

RUN mkdir /var/app/website
WORKDIR /var/app/website

COPY ./website/package.json ./package.json
COPY ./website/package-lock.json ./package-lock.json

RUN npm install

COPY ./website .
COPY ./icons ../icons

RUN npm run build-dev

CMD ["npm", "run", "start"]