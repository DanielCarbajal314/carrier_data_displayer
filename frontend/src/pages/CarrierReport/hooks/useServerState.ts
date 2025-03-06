import { useMemo, useState } from "react";
import {
  getCarrierReport,
  getCarrierInformationByDate,
  getUsaStates,
} from "../api";
import { CarrierInformation } from "../api/types";
import { useQuery } from "@tanstack/react-query";
import { calculateMapBoundsFromGeoJSON } from "./transformations/calculateMapBoundsFromGeoJSON";
import { buildStateColorMap } from "./transformations/buildStateColorMap";

export function useServerState() {
  const [selectedDate, setSelectedDate] = useState<string>();
  const { data: dates, isLoading: dateOptionsAreLoading } = useQuery<Date[]>({
    queryKey: ["carrier-report-dates"],
    queryFn: getCarrierReport,
  });
  const { data: carrierInformation, isLoading: carrierInformationIsLoading } =
    useQuery<CarrierInformation>({
      queryKey: ["carrier-report", selectedDate],
      queryFn: () => getCarrierInformationByDate(selectedDate ?? ""),
      enabled: !!selectedDate,
    });
  const { data: usaFeatures, isLoading: useFeaturesAreLoading } =
    useQuery<GeoJSON.FeatureCollection>({
      queryKey: ["use-states"],
      queryFn: getUsaStates,
    });
  const stateColorMap = useMemo(
    () => buildStateColorMap(carrierInformation),
    [carrierInformation],
  );

  const dateOptions =
    dates?.map((date) => ({
      label: date.toDateString().split(" ").slice(1).join(" "),
      value: date.toISOString().split("T")[0],
    })) ?? [];
  const setSelectedCarrierDate = (date: string) => setSelectedDate(date);
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
    dateOptions,
    usaFeatures,
    useFeaturesAreLoading,
    dateOptionsAreLoading,
    carrierInformation,
    carrierInformationIsLoading,
    setSelectedCarrierDate,
    stateColorMap,
    mapBounds,
    recordsCountPerState,
  };
}
