import { Layer, Source } from "react-map-gl/maplibre";
import { Feature } from "geojson";

interface PointSourceProps {
  centroid: Feature;
  showLabel?: boolean;
}

export function CentroidSource({ centroid, showLabel }: PointSourceProps) {
  return (
    <Source
      type="geojson"
      data={{
        ...centroid,
        properties: {
          label: `Centroid`,
        },
      }}
    >
      <Layer
        type="circle"
        source="point"
        paint={{
          "circle-radius": 4,
          "circle-color": "red",
          "circle-stroke-color": "#ffffff",
          "circle-stroke-width": 1,
        }}
      />
      <Layer
        type="symbol"
        layout={{
          "text-field": ["get", "label"],
          "text-font": ["Open Sans Regular"],
          "text-size": 8,
          "text-anchor": "top",
          visibility: showLabel ? "visible" : "none",
        }}
        paint={{
          "text-color": "#000000",
          "text-halo-color": "#ffffff",
          "text-halo-width": 2,
        }}
      />
    </Source>
  );
}
