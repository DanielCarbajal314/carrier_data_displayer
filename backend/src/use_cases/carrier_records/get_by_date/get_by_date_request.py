from datetime import date

from ...base.base_scheme import BaseSchema


class GetByDateRequest(BaseSchema):
    date: date
