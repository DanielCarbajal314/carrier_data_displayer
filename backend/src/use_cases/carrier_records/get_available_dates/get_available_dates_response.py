from datetime import date
from ...base.base_scheme import BaseSchema
from typing import List

class GetAvailableDateResponse(BaseSchema):
    dates: List[date]