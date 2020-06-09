FROM node:10.13-alpine

ENV APP /app
RUN mkdir $APP
WORKDIR $APP

COPY ./backend/package.json $APP/

CMD ["node", "index.js"]
