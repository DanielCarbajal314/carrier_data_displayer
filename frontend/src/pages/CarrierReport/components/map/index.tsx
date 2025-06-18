import Map, { Layer, MapProps, MapRef, Source } from "react-map-gl/maplibre";
import { LngLatBounds } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";

interface MapBoxPropsWrapper extends MapProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  bounds: LngLatBounds;
  usaFeatures?: GeoJSON.FeatureCollection;
  className?: string;
}

export function Mapboxs({
  children,
  style,
  bounds,
  usaFeatures,
  className,
  ...props
}: MapBoxPropsWrapper) {
  const mapRef = useRef<MapRef>(null);
  useEffect(() => {
    mapRef.current?.fitBounds(bounds, {
      zoom: 8,
    });
  }, [bounds]);
  return (
    <div className={`${className} relative w-1/2 h-[400px]`}>
      <div className="rounded-default">
        <Map
          {...props}
          initialViewState={{
            bounds: bounds,
            zoom: 9,
          }}
          ref={mapRef}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=Q3Qif9SL3PKexfYruIip	"
          style={{
            height: "400px",
            width: "100%",
            ...style,
            borderRadius: "0.3125rem",
          }}
        >
          {children}
          {usaFeatures && (
            <Source id="usa" type="geojson" data={usaFeatures}>
              <Layer
                id="usa"
                type="fill"
                paint={{
                  "fill-color": "#f08",
                  "fill-opacity": 0.12,
                }}
              />
              <Layer
                id="usa-border"
                type="line"
                paint={{
                  "line-color": "#f08",
                  "line-width": 0.5,
                }}
              />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
}
