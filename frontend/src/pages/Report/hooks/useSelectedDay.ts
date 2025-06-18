import { useMemo, useState } from "react";
import { useCarrierInformation } from "../../CarrierReport/hooks/useCarrierInformation";
import { buildStateColorMap } from "../../CarrierReport/hooks/transformations/buildStateColorMap";
import { calculateMapBoundsFromGeoJSON } from "../../CarrierReport/hooks/transformations/calculateMapBoundsFromGeoJSON";

export function useSelectedDay(){
    const [selectedDate, setSelectedDate] = useState<Date>();
    const selectedDateAsString = selectedDate?.toISOString().split("T")[0];
    const { carrierInformation, carrierInformationIsLoading } = useCarrierInformation(selectedDate);
    
    const setDate = (date: Date) => setSelectedDate(date);

      const stateColorMap = useMemo(
        () => buildStateColorMap(carrierInformation),
        [carrierInformation],
      );

      const mapBounds = useMemo(
        () =>
          calculateMapBoundsFromGeoJSON(
            carrierInformation?.records.map((x) => x.geojson) ?? [],
          ),
        [carrierInformation],
      );
    
      const recordsCountPerState: Record<string, number> = useMemo(() => {
        return (
          carrierInformation?.records.reduce(
            (acc, { state }) => {
              acc[state] = acc[state] ? acc[state] + 1 : 1;
              return acc;
            },
            {} as Record<string, number>,
          ) ?? {}
        );
      }, [carrierInformation]);

    return {
        mapBounds,
        selectedDate: selectedDateAsString,
        stateColorMap,
        recordsCountPerState,
        showDetails: !!selectedDate,
        setDate,
        carrierInformation,
        carrierInformationIsLoading,
    }
}