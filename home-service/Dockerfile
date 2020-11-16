FROM node:12

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV HOME_SERVICE_PORT=5000

EXPOSE 5000

CMD ["npm","start"]