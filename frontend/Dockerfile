# FROM nginx:alpine

# RUN rm -rf /usr/share/nginx/html/*

# RUN apk update && apk upgrade

# COPY nginx.conf /etc/nginx/nginx.conf

# WORKDIR /usr/share/nginx/html

# COPY build/ .

# CMD ["nginx", "-g", "daemon off;"]

FROM node:12

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm","start"]