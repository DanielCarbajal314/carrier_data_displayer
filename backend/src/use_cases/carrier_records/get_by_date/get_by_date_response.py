from datetime import datetime
from ...base.base_scheme import BaseSchema
from typing import List

class CarrierRecord(BaseSchema):
    date: datetime
    county: str
    state: str
    geojson: dict | None

class CountyData(BaseSchema):
    name: str
    state: str
    geojson: dict | None

class GetByDateResponse(BaseSchema):
    records: List[CarrierRecord]
    counties: List[CountyData]