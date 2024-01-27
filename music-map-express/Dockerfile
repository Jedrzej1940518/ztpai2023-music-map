FROM node:14

#debugging purposes
RUN apt-get update \
    && apt-get install -y postgresql-client

WORKDIR /usr/src/app

ENV DEPS="cors express jsonwebtoken pg sequelize sequelize-cli cookie cookie-parser sequelize-auto bcrypt"
ENV SWAGGER_DEPS="swagger-ui-express swagger-jsdoc"

RUN npm install $DEPS $SWAGGER_DEPS

COPY . .

EXPOSE $BACKEND_PORT

CMD ["npm", "start"]
