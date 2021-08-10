FROM node:16.6.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src

EXPOSE 80

CMD [ "npm", "start" ]
