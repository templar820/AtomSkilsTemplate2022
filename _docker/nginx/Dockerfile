FROM node:14.19.0-buster AS build-stage

ADD /frontend /frontend
WORKDIR /frontend

RUN npm install --legacy-peer-deps

ENV ESLINT_NO_DEV_ERRORS true
ENV DISABLE_ESLINT_PLUGIN true
ENV CI false
ENV TSC_COMPILE_ON_ERROR true


RUN npm run build




FROM nginx:latest
COPY --from=build-stage /frontend/build/ /usr/share/nginx/html
COPY _docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf