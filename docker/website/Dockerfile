FROM node:slim

RUN mkdir -p /var/app/website
WORKDIR /var/app/website

COPY ./website .

RUN npm install

COPY ./website/icons ./icons

RUN npm run build-dev

EXPOSE 80

CMD ["npm", "run", "start"]