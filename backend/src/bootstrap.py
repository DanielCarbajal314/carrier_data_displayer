from logging import getLogger
from uuid import uuid4

from fastapi import FastAPI, Request, logger
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

logger = getLogger(__name__)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/healthcheck/")
def healthcheck():
    return "Health - OK s"


@app.exception_handler(ValidationError)
async def unicorn_exception_handler(request: Request, exc: ValidationError):
    errors = [{"field": a["loc"][0], "message": a["msg"]} for a in exc.errors()]
    return JSONResponse(
        status_code=400,
        content={"errors": errors},
    )


@app.exception_handler(Exception)
async def json_exception_handler(request: Request, exc: Exception):
    error_code = uuid4()
    logger.error(f"Error code: {error_code}")
    logger.error(exc)
    return JSONResponse(
        status_code=500,
        content={"message": f"Internal server error. Error code: {error_code}"},
    )
