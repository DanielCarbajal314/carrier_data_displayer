import { useState } from "react";
import { Select } from "../../shared/components";
import { Mapboxs } from "./components/map";
import { PointSource } from "./components/map/components/PointSource";
import { useServerState } from "./hooks/useServerState";
import { CentroidSource } from "./components/map/components/CentroidSource";
import { ChartView } from "./components/ChartView";
import { StateCountInformation } from "./components/StateCountInformation";

export function CarrierReport() {
  const {
    dateOptions,
    setSelectedCarrierDate,
    carrierInformation,
    mapBounds,
    usaFeatures,
    stateColorMap,
    recordsCountPerState,
  } = useServerState();
  const [showLabel, setShowLabel] = useState(false);
  return (
    <div>
      <p className="text-3xl mb-5">Carrier Report</p>
      <div className="flex justify-between items-end w-1/2 px-5">
        <div className="w-1/4">
          <Select
            label="Available Dates"
            options={dateOptions}
            setSelectedOptions={setSelectedCarrierDate}
          />
        </div>
        <div className="flex items-center gap-3">
          <p>Show Labels</p>
          <input
            type="checkbox"
            checked={showLabel}
            onChange={() => setShowLabel(!showLabel)}
          />
        </div>
      </div>
      <div className="flex gap-5">
        <Mapboxs bounds={mapBounds} usaFeatures={usaFeatures}>
          <>
            {carrierInformation?.records.map((record, index) => (
              <PointSource
                key={index}
                showLabel={showLabel}
                stateColorMap={stateColorMap}
                record={record}
              />
            ))}
            {carrierInformation && (
              <CentroidSource
                centroid={carrierInformation.centroid}
                showLabel={showLabel}
              />
            )}
          </>
        </Mapboxs>
        {carrierInformation && (
          <ChartView
            stateColorMap={stateColorMap}
            data={carrierInformation.records}
          />
        )}
      </div>
      {carrierInformation && (
        <StateCountInformation {...{ stateColorMap, recordsCountPerState }} />
      )}
    </div>
  );
}
