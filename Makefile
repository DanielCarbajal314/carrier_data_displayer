include .env

up:
	@docker compose up --build

up-detached:
	@docker compose up --build -d

down:
	@docker compose down --remove-orphans -v

open-pg-admin:
	@open http://localhost:8080

open-ui:
	@open http://localhost:3000

generate-models:
	@docker compose exec generator bash -c "sqlacodegen ${POSTGRES_URL}  --outfile ./generated/models.py"

add-python-dependency:
	@docker compose exec backend bash -c "poetry add $(name)"
	@docker compose cp backend:/code/pyproject.toml ./backend/pyproject.toml
	@docker compose cp backend:/code/poetry.lock ./backend/poetry.lock

format:
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec backend bash -c "poetry run black ."
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec backend bash -c "poetry run isort ."
	@docker compose $(LOCAL_DEVELOPMENT_FILES) exec ui bash -c "npm run format"

add-npm-dependency:
	@docker compose exec ui bash -c "npm install $(name)"
	@docker compose cp ui:/code/package.json ./frontend/package.json
	@docker compose cp ui:/code/package-lock.json ./frontend/package-lock.json

start: up-detached open-ui