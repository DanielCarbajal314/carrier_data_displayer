from ...base.base_handler import BaseHandler
from .get_available_dates_request import GetAvailableDateRequest
from .get_available_dates_response import GetAvailableDateResponse


class GetAvailableDateHandler(BaseHandler[GetAvailableDateRequest, GetAvailableDateResponse]):
    async def execute(self, request: GetAvailableDateRequest) -> GetAvailableDateResponse:
        dates = await self.unit_of_work.carrier_record_repository.get_available_dates()
        print(dates)
        return GetAvailableDateResponse(
            dates=dates
        )