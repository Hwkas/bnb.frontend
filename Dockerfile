FROM node:current-alpine3.19

# Setting workdir to app
WORKDIR /app

RUN npm install -g npm@latest

COPY package-lock.json .
COPY package.json .

RUN npm install i