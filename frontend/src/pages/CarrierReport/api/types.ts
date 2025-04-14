import { Feature } from "geojson";

export interface CarrierRecordsDates {
  dates: string[];
}

export interface CarrierInformation {
  records: CarrierRecord[];
  counties: County[];
  report: ReportData[];
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

export interface ReportData {
  start: string;
  end: string;
  secondsDuration: number;
  sampleNumber: number;
  county: string;
  state: string;
  centroid: Feature;
  distanceFromPrevious: number;
}
