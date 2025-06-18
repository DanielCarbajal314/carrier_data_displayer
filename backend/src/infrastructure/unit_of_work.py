from sqlalchemy.ext.asyncio import AsyncSession

from .repositories.carrier_record_repository import CarrierRecordRepository
from .repositories.county_repository import CountyRepository
from .repositories.report_repository import ReportRepository

class UnitOfWork:
    __session: AsyncSession
    carrier_record_repository: CarrierRecordRepository
    county_repository: CountyRepository
    report_repository: ReportRepository

    def __init__(self, session: AsyncSession):
        self.__session = session
        self.county_repository = CountyRepository(session)
        self.carrier_record_repository = CarrierRecordRepository(session)
        self.report_repository = ReportRepository(session)
