import { useQuery } from "@tanstack/react-query";
import { getSummaryReport, ReportItem } from "../api";

export function useServerState(){
    const {data: reportData, isLoading: reportDataIsLoading} = useQuery<ReportItem[]>({
        queryKey: ["getSummaryReport"],
        queryFn: getSummaryReport,
    });
    return {
        reportData,
        reportDataIsLoading,
    };
}