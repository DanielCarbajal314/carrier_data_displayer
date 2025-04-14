from datetime import datetime
from typing import List

from ...base.base_scheme import BaseSchema


class CarrierRecord(BaseSchema):
    date: datetime
    county: str
    state: str
    geojson: dict | None
    distance: float


class CountyData(BaseSchema):
    name: str
    state: str
    geojson: dict | None


class ReportData(BaseSchema):
    start: datetime
    end: datetime
    seconds_duration: float
    sample_number: int
    county: str
    state: str
    centroid: dict
    distance_from_previous: float | None


class GetByDateResponse(BaseSchema):
    records: List[CarrierRecord]
    counties: List[CountyData]
    report: List[ReportData]
    centroid: dict
