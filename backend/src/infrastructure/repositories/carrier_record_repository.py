from dataclasses import dataclass
from datetime import date, datetime
from typing import List, Optional

from geoalchemy2 import WKBElement
from sqlalchemy import func, select

from src.db.models import Carrierrecord
from src.infrastructure.repositories.carrier_record_query.carrier_records_report import (
    ReportData, build_carrier_records_report_query)

from .base_repository import BaseRepository
from .shared.geometry_to_geojson import geometry_to_geojson


@dataclass
class RecordData:
    county: str
    state: str
    local_date_time: datetime
    geojson: Optional[dict]
    distance: float


@dataclass
class CentroidData:
    geojson: dict
    centroid: WKBElement


class CarrierRecordRepository(BaseRepository[Carrierrecord]):
    _entity_class = Carrierrecord

    async def get_by_date(self, target_date: date, centroid: WKBElement) -> List[RecordData]:
        query = (
            select(
                Carrierrecord.county,
                Carrierrecord.state,
                Carrierrecord.local_date_time,
                Carrierrecord.geom,
                func.ST_Distance(Carrierrecord.geom, centroid).label("distance"),
            )
            .where(func.date(Carrierrecord.local_date_time) == target_date, Carrierrecord.latitude > 0)
            .group_by(
                Carrierrecord.county,
                Carrierrecord.state,
                Carrierrecord.local_date_time,
                Carrierrecord.geom,
                func.ST_Distance(Carrierrecord.geom, centroid).label("distance"),
            )
            .order_by(Carrierrecord.local_date_time)
        )
        records = await self._session.execute(query)
        data = records.mappings().all()
        return [
            RecordData(
                county=record["county"],
                state=record["state"],
                local_date_time=record["local_date_time"],
                geojson=geometry_to_geojson(record["geom"]),
                distance=record["distance"],
            )
            for record in data
        ]

    async def get_carrier_report_by_date(self, target_date: date) -> List[RecordData]:
        query = build_carrier_records_report_query(target_date)
        records = await self._session.execute(query)
        data = records.mappings().all()
        return [
            ReportData(
                county=record["county"],
                state=record["state"],
                start=record["start"],
                end=record["end"],
                seconds_duration=record["seconds_duration"],
                sample_number=record["sample_number"],
                distance_from_previous=record["distance_from_previous"],
                centroid=geometry_to_geojson(record["centroid_geom"]),
            )
            for record in data
        ]

    async def calculate_centroid_by_date(self, target_date: date) -> CentroidData:
        query = select(func.ST_Centroid(func.ST_Union(Carrierrecord.geom))).where(
            func.date(Carrierrecord.local_date_time) == target_date, Carrierrecord.latitude > 0
        )
        records = await self._session.execute(query)
        data = records.mappings().all()
        return CentroidData(geojson=geometry_to_geojson(data[0]["ST_Centroid"]), centroid=data[0]["ST_Centroid"])

    async def get_available_dates(self) -> List[date]:
        query = (
            select(func.date(Carrierrecord.local_date_time))
            .group_by(func.date(Carrierrecord.local_date_time))
            .order_by(func.date(Carrierrecord.local_date_time))
        )
        records = await self._session.execute(query)
        data = records.scalars().all()
        return data
