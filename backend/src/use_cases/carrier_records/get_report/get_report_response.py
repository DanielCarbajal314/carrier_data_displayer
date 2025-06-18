from ...base.base_scheme import BaseSchema
from datetime import date

class CountyLocation(BaseSchema):
    county: str
    count: int

class StateLocation(BaseSchema):
    state: str
    count: int
    percentage: float
    county_data: list[CountyLocation]

class GetReportResponseItem(BaseSchema):
    day: date
    standart_deviation: float
    samples: int
    locations: list[StateLocation]
    is_consider_stacionary: bool
    number_of_states: int 


