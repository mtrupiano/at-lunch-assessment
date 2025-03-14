export type GooglePlacesApiResponseType = {
  nextPageToken: string;
  places: Place[];
};

export type Place = {
  id: string;
  displayName: {
    text: string;
    languageCode: string;
  };
  formattedAddress: string;
  location: {
    latitude: number;
    longitude: number;
  };
  rating: number;
  userRatingCount: number;
  photos: Photo[];
};

type Photo = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: {
    displayName: string;
    uri: string;
    photoUri: string;
  }[];
  flagContentUri: string;
  googleMapsUri: string;
};
