export interface ReportItem {
    day: Date
    standartDeviation: number
    samples: number
    locations: Location[]
    isConsiderStacionary: boolean
    numberOfStates: number
}

export interface Location {
  state: string
  countyData: CountyDaum[]
}

export interface CountyDaum {
  county: string
  count: number
}
