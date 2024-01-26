
FROM node:14

WORKDIR /usr/src/app

ENV DEPS_FONT_AWESOME="@fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome"
ENV DEPS="create-react-app validator cookie @vis.gl/react-google-maps multi-range-slider-react"

RUN npm install $DEPS $DEPS_FONT_AWESOME

RUN npx create-react-app music_map

WORKDIR /usr/src/app/music_map

COPY . .

EXPOSE $FRONTEND_PORT

CMD [ "npm", "start" ]
 