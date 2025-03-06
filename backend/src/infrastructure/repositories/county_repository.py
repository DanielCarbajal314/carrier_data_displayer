from dataclasses import dataclass
from typing import List, Optional

from sqlalchemy import select

from ...db.models import t_counties
from .base_repository import TableRepository
from .shared.geometry_to_geojson import geometry_to_geojson


@dataclass
class CountyData:
    county_name: str
    state: str
    geojson: Optional[dict]


class CountyRepository(TableRepository):
    async def get_by_names(self, names: List[str]):
        query = select(t_counties.c.name, t_counties.c.state, t_counties.c.geom).where(t_counties.c.name.in_(names))
        response = await self._session.execute(query)
        data = response.fetchall()
        return [
            CountyData(county_name=county[0], state=county[1], geojson=geometry_to_geojson(county[2]))
            for county in data
        ]
