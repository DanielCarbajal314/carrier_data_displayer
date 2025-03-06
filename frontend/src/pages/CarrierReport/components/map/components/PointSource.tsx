import { Layer, Source } from "react-map-gl/maplibre";
import { CarrierRecord } from "../../../api/types";

interface PointSourceProps {
  record: CarrierRecord;
  showLabel?: boolean;
  stateColorMap: Record<string, string>;
}

export function PointSource({
  record: { geojson, date, county, state },
  showLabel,
  stateColorMap,
}: PointSourceProps) {
  return (
    <Source
      type="geojson"
      data={{
        ...geojson,
        properties: {
          label: `${state} - ${county} - ${date}`,
        },
      }}
    >
      <Layer
        type="circle"
        source="point"
        paint={{
          "circle-radius": 4,
          "circle-color": stateColorMap[state],
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
