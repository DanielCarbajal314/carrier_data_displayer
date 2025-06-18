import { useQuery } from "@tanstack/react-query";
import { CarrierInformation } from "../api/types";
import { getCarrierInformationByDate } from "../api";

export function useCarrierInformation(date?: Date){
    const selectedDate = date?.toISOString().split("T")[0];
    const { data: carrierInformation, isFetching: carrierInformationIsLoading } =
    useQuery<CarrierInformation>({
      queryKey: ["carrier-report", selectedDate],
      queryFn: () => getCarrierInformationByDate(selectedDate ?? ""),
      enabled: !!selectedDate,
    });
    return {
        carrierInformation,
        carrierInformationIsLoading,
    }
}