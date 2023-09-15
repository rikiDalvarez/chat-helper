FROM node:18-alpine

RUN apk add curl

WORKDIR /client

COPY package*.json /client

RUN npm install

COPY . /client
RUN npm run build
EXPOSE 5173

CMD npm run dev
