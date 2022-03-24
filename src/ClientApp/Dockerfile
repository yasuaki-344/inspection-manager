# build environment
FROM node:16-alpine3.14 AS build

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i

COPY . ./
RUN npm run build

# runtime envrionment
FROM nginx:1.20.2-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]
