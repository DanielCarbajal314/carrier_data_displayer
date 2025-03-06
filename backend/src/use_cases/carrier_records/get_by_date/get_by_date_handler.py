from ...base.base_handler import BaseHandler
from .get_by_date_request import GetByDateRequest
from .get_by_date_response import CarrierRecord, CountyData, GetByDateResponse


class GetByDateHandler(BaseHandler[GetByDateRequest, GetByDateResponse]):
    async def execute(self, request: GetByDateRequest) -> GetByDateResponse:
        centroid_data = await self.unit_of_work.carrier_record_repository.calculate_centroid_by_date(request.date)
        records = await self.unit_of_work.carrier_record_repository.get_by_date(request.date, centroid_data.centroid)
        county_names = list(set([record.county for record in records]))
        counties = await self.unit_of_work.county_repository.get_by_names(county_names)

        carrier_records = [
            CarrierRecord(
                date=record.local_date_time,
                county=record.county,
                state=record.state,
                geojson=record.geojson,
                distance=record.distance,
            )
            for record in records
        ]

        counties_records = [
            CountyData(name=county.county_name, state=county.state, geojson=county.geojson) for county in counties
        ]

        return GetByDateResponse(records=carrier_records, counties=counties_records, centroid=centroid_data.geojson)
