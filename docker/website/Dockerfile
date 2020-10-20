FROM node:slim

RUN mkdir /var/app/website
WORKDIR /var/app/website

COPY ./website .

RUN npm install

COPY ./icons ./icons

RUN npm run build-dev

CMD ["npm", "run", "start"]