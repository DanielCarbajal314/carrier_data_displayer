import { httpGet } from "../../../shared/utils/http";
import { ReportItem } from "./types";
export { type ReportItem } from "./types";

export const getSummaryReport = (): Promise<ReportItem[]> => {
  return httpGet<ReportItem[]>("carrier-records/report").then(data => data.map(
    x => ({
        ...x,
        day: new Date(`${x.day} 00:00:00`)
    })
  ));
};

