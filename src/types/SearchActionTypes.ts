import { Place } from "./GooglePlacesApiResponseType";

/** Location bias for google places API args */
export type LocationBias = {
  circle?: {
    center: {
      latitude: number;
      longitude: number;
    };
    radius: number;
  };
  rectangle?: {
    high: {
      latitude: number;
      longitude: number;
    };
    low: {
      latitude: number;
      longitude: number;
    };
  };
};

export type SearchActionNewResponseShape = {
  nextPageToken: string;
  places: Place[];
  status: number;
  originalQueryParams: {
    textQuery: string;
    locationBias: LocationBias;
  };
};
