FROM nginx:latest

COPY ./_docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ./_docker/nginx/run_nginx.sh /etc/nginx/conf.d/run_nginx.sh



#RUN ['apt-get update']
#RUN ['apt-get install nano -y']
RUN ["chmod", "+x", "/etc/nginx/conf.d/run_nginx.sh"]
