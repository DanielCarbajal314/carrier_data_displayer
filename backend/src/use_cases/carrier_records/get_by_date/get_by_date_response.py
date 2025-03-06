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


class GetByDateResponse(BaseSchema):
    records: List[CarrierRecord]
    counties: List[CountyData]
    centroid: dict
