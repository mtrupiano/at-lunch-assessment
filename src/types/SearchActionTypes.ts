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
  places: google.maps.places.Place[];
  status: number;
  originalQueryParams: {
    textQuery: string;
    locationBiasRectangle: LocationBias;
  };
};
