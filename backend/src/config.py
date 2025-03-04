from typing import Annotated

from pydantic import Field
from pydantic_settings import BaseSettings

class Config(BaseSettings):
    database_url: Annotated[str, Field(alias="POSTGRES_URL")]

config = Config()