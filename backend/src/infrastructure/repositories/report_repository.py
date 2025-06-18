from dataclasses import dataclass
from typing import List
from sqlalchemy import select
from datetime import date
from ...db.models import t_day_summary_by_location, DaySummary
from .base_repository import TableRepository


@dataclass
class SummaryByLocation:
    day: date
    state: str
    county: str
    count: int

@dataclass
class DateSummary:
    day: date
    standart_deviation: float
    samples: int
    county: str
    state: str


class ReportRepository(TableRepository):

    async def get_summary_by_location(self) -> List[SummaryByLocation]:
        columns = t_day_summary_by_location.c
        query = select(columns)
        response = await self._session.execute(query)
        data = response.fetchall()
        return [
            SummaryByLocation(day=report[0], state=report[1], county=report[2], count=report[3])
            for report in data
        ]

    async def get_date_summary(self) -> List[DateSummary]:
        query = select(DaySummary).order_by(DaySummary.day)
        response = await self._session.execute(query)
        data = response.scalars().all()
        return [
            DateSummary(
                day=report.day,
                standart_deviation=report.standart_deviation,
                samples=report.samples,
                county=report.county,
                state=report.state,
            )
            for report in data
        ]

