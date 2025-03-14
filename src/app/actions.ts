"use server";

import {
  LocationBias,
  SearchActionNewResponseShape,
} from "@/types/SearchActionTypes";

const GOOGLE_PLACES_V1_URL =
  "https://places.googleapis.com/v1/places:searchText";

const googleApiFieldMask = [
  "nextPageToken",
  "places.id",
  "places.displayName",
  "places.formattedAddress",
  "places.location",
  "places.rating",
  "places.userRatingCount",
  "places.photos",
].join(",");

export async function nextPageSearchNew(
  pageToken: string,
  originalQueryParams: {
    textQuery: string;
    locationBias: LocationBias;
  },
): Promise<SearchActionNewResponseShape | null> {
  const request = {
    pageToken,
    includedType: "restaurant",
    ...originalQueryParams,
  };
  const results = await fetch(GOOGLE_PLACES_V1_URL, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": googleApiFieldMask,
    },
  });

  const parsed = await results.json();
  return {
    ...parsed,
    status: results.status,
    originalQueryParams,
  };
}

export async function searchActionNew(
  textQuery: string,
  locationBias: LocationBias,
): Promise<SearchActionNewResponseShape | null> {
  const request = {
    textQuery,
    includedType: "restaurant",
    locationBias,
  };
  const results = await fetch(GOOGLE_PLACES_V1_URL, {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      "X-Goog-FieldMask": googleApiFieldMask,
    },
  });

  console.log(results.status);
  const parsed = await results.json();

  return {
    ...parsed,
    status: results.status,
    originalQueryParams: {
      textQuery,
      locationBias,
    },
  };
}