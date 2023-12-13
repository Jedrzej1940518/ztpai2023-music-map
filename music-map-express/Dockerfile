FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $BACKEND_PORT

CMD [ "node", "server.js" ]
