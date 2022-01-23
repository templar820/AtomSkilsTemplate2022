FROM node:14.16-buster-slim

ADD /frontend /frontend
ADD ./.env ./.env

WORKDIR /frontend

#RUN npm set registry http://host.docker.internal:4873
#RUN npm set registry http://172.17.0.1:4873
RUN npm install

EXPOSE 3000
