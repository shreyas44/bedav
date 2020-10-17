FROM node:slim

RUN mkdir /var/app
WORKDIR /var/app

COPY ./package.json ./package.json
RUN npm install

COPY ./webpack.common.js ./webpack.common.js
COPY ./webpack.dev.js ./webpack.dev.js
COPY ./.babelrc ./.babelrc

COPY ./web ./web
COPY ./icons ./icons

RUN npm run build-dev

EXPOSE 80

CMD ["npm", "run", "start"]