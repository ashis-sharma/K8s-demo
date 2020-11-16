FROM node:12

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV MAIN_SERVICE_PORT=5003

EXPOSE 5003

CMD ["npm","start"]