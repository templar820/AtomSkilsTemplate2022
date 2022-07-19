FROM node:14.19.3 as builder

WORKDIR /frontend
COPY /frontend/package.json ./
COPY /frontend/package-lock.json ./
RUN npm install --silent
COPY /frontend ./

EXPOSE 3000


# production environment
#FROM nginx:stable-alpine
#COPY --from=builder /frontend/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
