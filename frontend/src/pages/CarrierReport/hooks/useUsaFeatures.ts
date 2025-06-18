import { useQuery } from "@tanstack/react-query";
import { getUsaStates } from "../api";

export function useUsaFeatures() {
  const { data: usaFeatures, isLoading: useFeaturesAreLoading } =
    useQuery<GeoJSON.FeatureCollection>({
      queryKey: ["use-states"],
      queryFn: getUsaStates,
    });
  return {
    usaFeatures,
    useFeaturesAreLoading,
  };
}