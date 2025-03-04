
from typing import Optional
from geoalchemy2.types import Geometry
from geoalchemy2.shape import to_shape
from shapely.geometry import mapping
from geoalchemy2.elements import WKBElement


def geometry_to_geojson(geometry: Geometry) -> Optional[dict]:
    if not isinstance(geometry, WKBElement):
        return None
    geom = to_shape(geometry)  
    return {
        'type': 'Feature',
        'geometry': mapping(geom),
    }