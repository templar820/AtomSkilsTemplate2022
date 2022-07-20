FROM node:14.19.3 as builder

WORKDIR /frontend
COPY /frontend/package.json ./
COPY /frontend/package-lock.json ./
RUN npm install --silent
COPY /frontend ./