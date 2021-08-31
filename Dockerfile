FROM node:16.6.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src/ ./src

ENV PORT=80
EXPOSE 80

CMD [ "npm", "start" ]
