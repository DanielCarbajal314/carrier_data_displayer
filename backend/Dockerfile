FROM python:3.12 AS base
RUN curl -sSL https://install.python-poetry.org | python3 -
ENV PATH="/root/.local/bin:$PATH"
WORKDIR /code
COPY ./pyproject.toml /code/pyproject.toml
COPY ./poetry.lock /code/poetry.lock
RUN poetry install

FROM base AS local_devlopment_base
RUN poetry install --with dev

FROM local_devlopment_base AS dev
CMD ["sh", "-c", "poetry run uvicorn src.main:app --reload --host 0.0.0.0"]

FROM base AS production
CMD ["poetry", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "80"]