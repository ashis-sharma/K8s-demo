FROM node:12

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

ENV WORK_SERVICE_PORT=5002

EXPOSE 5002

CMD ["npm","start"]