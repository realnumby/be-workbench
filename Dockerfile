FROM node:current-alpine

WORKDIR /usr/src/app

COPY /src .
COPY docker-entrypoint.sh .
COPY index.js .
COPY .sequelizerc .

EXPOSE 8000

ENTRYPOINT ["sh", "./docker-entrypoint.sh"]