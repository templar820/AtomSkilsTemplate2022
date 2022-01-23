FROM node:14.16-buster-slim

ADD /db_transactions /db_transactions

WORKDIR /db_transactions

#RUN npm set registry http://host.docker.internal:4873
#RUN npm set registry http://172.17.0.1:4873/
RUN npm install
