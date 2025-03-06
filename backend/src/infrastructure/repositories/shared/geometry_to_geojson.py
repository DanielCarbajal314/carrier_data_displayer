from typing import Optional

from geoalchemy2.elements import WKBElement
from geoalchemy2.shape import to_shape
from geoalchemy2.types import Geometry
from shapely.geometry import mapping


def geometry_to_geojson(geometry: Geometry) -> Optional[dict]:
    if not isinstance(geometry, WKBElement):
        return None
    geom = to_shape(geometry)
    return {
        "type": "Feature",
        "geometry": mapping(geom),
    }
