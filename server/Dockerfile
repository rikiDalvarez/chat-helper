FROM node:19.1-alpine

ENV MONGO_URI="mongodb://mongodb:27017"
ENV NODE_ENV="development"
ENV DATABASE_ENV='mongo'
ENV TEST_DATABASE='test'
ENV DATABASE="chat-helper"
ENV PORT="5000"
ENV JWT_SECRET="5dd0aa20-a5c7-472c-b4aa-2d7716a5a654"
WORKDIR /server
COPY package*.json /server
RUN npm install
COPY . /server
RUN npm uninstall bcrypt
RUN npm install bcrypt
RUN npm run build
EXPOSE 5000
CMD npm run start