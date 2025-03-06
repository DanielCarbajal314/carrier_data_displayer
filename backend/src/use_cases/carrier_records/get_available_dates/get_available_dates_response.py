from datetime import date
from typing import List

from ...base.base_scheme import BaseSchema


class GetAvailableDateResponse(BaseSchema):
    dates: List[date]
