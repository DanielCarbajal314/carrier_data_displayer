import { httpGet } from "../../../shared/utils/http";
import { CarrierRecordsDates, CarrierInformation } from "./types";

export const getCarrierReport = () => {
  return httpGet<CarrierRecordsDates>("carrier-records/dates").then((x) =>
    x.dates.map((date) => new Date(`${date} 00:00:00`)),
  );
};

export const getCarrierInformationByDate = (date: string) => {
  return httpGet<CarrierInformation>(`carrier-records/${date}`);
};

export const getUsaStates = (): Promise<GeoJSON.FeatureCollection> => {
  return fetch("/public/us-states.json").then(
    (x) => x.json() as unknown as GeoJSON.FeatureCollection,
  );
};
