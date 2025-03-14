"use client";

import { useContext, useEffect, useState } from "react";
import { Map, useMap } from "@vis.gl/react-google-maps";
import { SearchResultsContext } from "../context/SearchResultsContext";
import MapMarker from "./MapMarker";

const SPACE_NEEDLE_LATLNG = {
  lat: 47.6205063,
  lng: -122.3518523,
};

export default function MapViewport() {
  const { searchResults } = useContext(SearchResultsContext);

  const map = useMap();
  const [initialGeocodeCompleted, setInitialGeocodeCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    // Effect to run initial geocode only after the map is loaded
    if (!initialGeocodeCompleted && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setInitialGeocodeCompleted(true);
          map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        null,
        { enableHighAccuracy: false, maximumAge: Infinity }, // options to speed up initial geolocation
      );
    }
  }, [map, initialGeocodeCompleted]);

  return (
    <Map
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_STYLE_ID}
      defaultCenter={SPACE_NEEDLE_LATLNG}
      defaultZoom={12}
      disableDefaultUI={true}
      clickableIcons={false}
      reuseMaps={true}
    >
      {searchResults?.places?.map((place, idx) => (
        <MapMarker
          key={`marker-${place.id}`}
          placeData={place}
          fallbackZIndex={idx}
        />
      ))}
    </Map>
  );
}
