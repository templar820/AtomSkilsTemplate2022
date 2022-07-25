start-backend:
	docker-compose -f docker-compose.develop_backend.yaml up -d

build-frontend:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml build
start-frontend:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml up -d


build-production:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml -f docker-compose.production.yaml build
start-production:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml -f docker-compose.production.yaml up



stop:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml -f docker-compose.production.yaml down

production:
	type .\_docker\nginx-conf\nginx.conf > .\nginx\nginx.conf
	docker-compose up -d --scale db_init=0 --scale db_clean=0



build:
	docker-compose build
	docker image prune -f
	docker-compose down
db:
	docker-compose up -d db_init
db-clean:
	docker-compose up -d db_clean

delete-all:
	docker-compose down
	docker system prune
