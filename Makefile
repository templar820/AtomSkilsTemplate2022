start-backend:
	docker-compose -f docker-compose.develop_backend.yaml up -d

build-frontend:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml build
start-frontend:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml up -d


build-production:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml -f docker-compose.production.yaml build
start-production:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml -f docker-compose.production.yaml -d up



stop:
	docker-compose -f docker-compose.develop_backend.yaml -f docker-compose.develop_frontend.yaml -f docker-compose.production.yaml down
