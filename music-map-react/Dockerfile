
FROM node:14

WORKDIR /usr/src/app

# Define dependencies
ENV DEPS="create-react-app validator cookie moment react-datepicker react-dates @vis.gl/react-google-maps"

RUN npm install $DEPS

RUN npx create-react-app music_map

WORKDIR /usr/src/app/music_map

COPY . .

EXPOSE $FRONTEND_PORT

CMD [ "npm", "start" ]
 