import { Feature } from "geojson";

export interface CarrierRecordsDates {
  dates: string[];
}

export interface CarrierInformation {
  records: CarrierRecord[];
  counties: County[];
  centroid: Feature;
}

export interface CarrierRecord {
  date: string;
  county: string;
  state: string;
  geojson: Feature;
  distance: number;
}

export interface County {
  name: string;
  state: string;
  geojson: Feature;
}
