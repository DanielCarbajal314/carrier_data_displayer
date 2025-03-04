from dataclasses import dataclass
from typing import List, Optional
from datetime import date, datetime
from geoalchemy2.types import Geometry
from .shared.geometry_to_geojson import geometry_to_geojson
from sqlalchemy import select, func

from src.db.models import Carrierrecord

from .base_repository import BaseRepository

@dataclass
class RecordData:
    county: str
    state: str
    local_date_time: datetime
    geojson: Optional[dict]

class CarrierRecordRepository(BaseRepository[Carrierrecord]):
    _entity_class = Carrierrecord

    async def get_by_date(self, target_date: date) -> List[RecordData]:
        query = select(
            Carrierrecord.county,
            Carrierrecord.state,
            Carrierrecord.local_date_time,
            Carrierrecord.geom,
        ).where(
            func.date(Carrierrecord.local_date_time) == target_date,
            Carrierrecord.latitude > 0
        ).group_by(
            Carrierrecord.county,
            Carrierrecord.state,
            Carrierrecord.local_date_time,
            Carrierrecord.geom
        ).order_by(
            Carrierrecord.local_date_time
        )
        records = await self._session.execute(query)
        data = records.mappings().all()
        return [
            RecordData(
                county=record['county'],
                state=record['state'],
                local_date_time=record['local_date_time'],
                geojson=geometry_to_geojson(record['geom'])
            )
            for record in
            data
        ]
    
    async def get_available_dates(self) -> List[date]:
        query = select(
            func.date(Carrierrecord.local_date_time)
        ).group_by(
            func.date(Carrierrecord.local_date_time)
        ).order_by(
            func.date(Carrierrecord.local_date_time)
        )
        records = await self._session.execute(query)
        data = records.scalars().all()
        return data