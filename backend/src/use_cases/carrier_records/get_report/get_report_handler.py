from datetime import date
from itertools import groupby
from typing import List

from ....infrastructure.repositories.report_repository import DateSummary, SummaryByLocation
from ...base.base_handler import BaseHandler
from .get_report_request import GetReportRequest
from .get_report_response import (GetReportResponseItem, StateLocation, CountyLocation)


class GetReportHandler(BaseHandler[GetReportRequest, List[GetReportResponseItem]]):
    async def execute(self, request: GetReportRequest) -> List[GetReportResponseItem]:
        report = await self.unit_of_work.report_repository.get_summary_by_location()
        date_summary = await self.unit_of_work.report_repository.get_date_summary()
        grouped_location_by_day = {day: self.build_state_location(records) for day, records in groupby(report, lambda x: x.day)}
        return [
            self.build_report_item(summary, grouped_location_by_day)
            for summary in date_summary
        ]
    
    def build_state_location(self, county_data: list[SummaryByLocation]) -> List[StateLocation]:
        data = [a for a in county_data]
        states = [a for a in set(county.state for county in data) ]
        total = sum(county.count for county in data)
        return [ StateLocation(
            state=state,
            count=sum(county.count for county in data if county.state == state),
            percentage=sum(county.count for county in data if county.state == state)/total,
            county_data=[
                CountyLocation(county=county.county, count=county.count) for county in data if county.state == state
            ]
        ) for state in states ]
    
    def build_report_item(self, summary: DateSummary, grouped_location_by_day: dict[date, List[StateLocation]]) -> GetReportResponseItem:
        number_of_states = len(set(location.state for location in grouped_location_by_day.get(summary.day, [])))
        is_consider_stacionary = summary.standart_deviation < 0.04
        locations=grouped_location_by_day.get(summary.day, [])
        #confiden, state = self.calculate_confidence(locations, is_consider_stacionary, number_of_states)
        return GetReportResponseItem(
            day=summary.day,
            standart_deviation=summary.standart_deviation,
            samples=summary.samples,
            locations=locations,
            is_consider_stacionary = is_consider_stacionary,
            number_of_states = number_of_states,
        )
    