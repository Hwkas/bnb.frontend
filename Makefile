build:
	docker compose down --rmi all --volumes && \
	docker builder prune -f && \
	docker compose up --build

clear:
	docker compose down --rmi all --volumes && \
	docker builder prune -f