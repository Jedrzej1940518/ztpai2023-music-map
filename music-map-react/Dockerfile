
FROM node:14

WORKDIR /usr/src/app

RUN npm install -g create-react-app

RUN npx create-react-app music_map

WORKDIR /usr/src/app/music_map

COPY . .

EXPOSE $FRONTEND_PORT

CMD [ "npm", "start" ]
 