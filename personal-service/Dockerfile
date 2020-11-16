FROM node:12

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV PERSONAL_SERVICE_PORT=5001

EXPOSE 5001

CMD ["npm","start"]