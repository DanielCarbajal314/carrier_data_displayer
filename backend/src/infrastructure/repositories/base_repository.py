from typing import Generic, List, TypeVar

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

TEntity = TypeVar("TEntity")


class TableRepository:

    def __init__(self, session: AsyncSession):
        self._session = session


class BaseRepository(Generic[TEntity]):
    _entity_class: TEntity
    _session: AsyncSession

    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> List[TEntity]:
        entities = await self._session.execute(select(self._entity_class).order_by(self._entity_class.id))
        return entities.scalars().all()

    async def create(self, data: TEntity) -> TEntity:
        self._session.add(data)
        await self._session.commit()
        await self._session.refresh(data)
        return data

    async def get(self, entity_id: int) -> TEntity:
        entities = await self._session.execute(select(self._entity_class).where(self._entity_class.id == entity_id))
        return entities.scalars().first()

    async def delete(self, entity_id: int):
        entity = await self.get(entity_id)
        await self._session.delete(entity)
        await self._session.commit()

    async def update(self, entity_id: int, **kwargs) -> TEntity:
        entity = await self.get(entity_id)
        if entity:
            for key, value in kwargs.items():
                setattr(entity, key, value)
            await self._session.commit()
            await self._session.refresh(entity)
        return entity
