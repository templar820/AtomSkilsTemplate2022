#!/usr/bin/env bash

echo "################################## Run nginx"
export DOLLAR='$'
envsubst < ./etc/nginx/conf.d/nginx.conf > /etc/nginx/conf.d/default.conf # /etc/nginx/conf.d/default.conf
rm -f ./etc/nginx/conf.d/nginx.conf
nginx -g "daemon off;"
