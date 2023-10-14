FROM node:14

WORKDIR /usr/src/app

RUN npm install -g create-react-app

RUN npx create-react-app nazwa_twojego_projektu

WORKDIR /usr/src/app/nazwa_twojego_projektu

EXPOSE 3000

CMD [ "npm", "start" ]
