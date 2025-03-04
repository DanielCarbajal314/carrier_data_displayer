from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

from src.config import config

from .unit_of_work import UnitOfWork

database_url = config.database_url.replace("postgresql://", "postgresql+asyncpg://")
engine = create_async_engine(database_url, echo=True)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def get_unit_of_work():
    session: AsyncSession = async_session()
    try:
        yield UnitOfWork(session)
    except SQLAlchemyError as e:
        await session.flush()
        await session.rollback()
        raise e
    finally:
        await session.close()
