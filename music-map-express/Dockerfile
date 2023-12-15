FROM node:14

#debugging purposes
RUN apt-get update \
    && apt-get install -y postgresql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $BACKEND_PORT

CMD ["npm", "start"]
