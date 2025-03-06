import { LngLatBounds, LngLat } from "maplibre-gl";

export function calculateMapBoundsFromGeoJSON(
  geojson: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[],
): LngLatBounds {
  if (!geojson.length) {
    // create default bounds in cases where no reference is passed
    const delta = 0.1;
    const latitude = 42.76;
    const longitude = -100.874;
    const sw = new LngLat(longitude - delta, latitude - delta);
    const ne = new LngLat(longitude + delta, latitude + delta);

    return new LngLatBounds(sw, ne);
  }

  const bounds = new LngLatBounds();

  geojson.forEach((gj) => {
    const geometry = gj.geometry;
    if (geometry.type === "Point") {
      bounds.extend(geometry.coordinates as [number, number]);
    } else if (
      geometry.type === "Polygon" &&
      Array.isArray(geometry.coordinates[0])
    ) {
      geometry.coordinates[0].forEach((coord) =>
        bounds.extend({ lng: coord[0], lat: coord[1] }),
      );
    }
  });

  return bounds;
}
