More to come!

express - backend
react - frontend

RUN:

docker-compose up

http://localhost:3001/

//zdefiniować api
//zdefiniwoać w aplikacji swagger

http://localhost:3000 - frontend

http://localhost:3001/api/festivals/1 - backend


FROM node:14

WORKDIR /usr/src/app

RUN npm install -g create-react-app

RUN npx create-react-app music_map

WORKDIR /usr/src/app/music_map

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
 