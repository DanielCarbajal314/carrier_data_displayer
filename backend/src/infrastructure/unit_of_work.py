from sqlalchemy.ext.asyncio import AsyncSession

from .repositories.carrier_record_repository import CarrierRecordRepository
from .repositories.county_repository import CountyRepository


class UnitOfWork:
    __session: AsyncSession
    carrier_record_repository: CarrierRecordRepository
    county_repository: CountyRepository

    def __init__(self, session: AsyncSession):
        self.__session = session
        self.county_repository = CountyRepository(session)
        self.carrier_record_repository = CarrierRecordRepository(session)
