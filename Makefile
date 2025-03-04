include .env

up:
	@docker compose up --build

down:
	@docker compose down --remove-orphans -v

open-pg-admin:
	@open http://localhost:8080

generate-models:
	@docker compose exec generator bash -c "sqlacodegen ${POSTGRES_URL}  --outfile ./generated/models.py"

add-python-dependency:
	@docker compose exec backend bash -c "poetry add $(name)"
	@docker compose cp backend:/code/pyproject.toml ./backend/pyproject.toml
	@docker compose cp backend:/code/poetry.lock ./backend/poetry.lock