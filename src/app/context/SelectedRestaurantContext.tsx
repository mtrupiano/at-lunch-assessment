import { createContext, useState } from "react";
import { Place } from "@/types/GooglePlacesLegacyApiTypes";

type SelectedRestaurantContextType = {
  selectedRestaurant: google.maps.places.Place;
  updateSelectedRestaurant: (place: google.maps.places.Place) => void;
};
export const SelectedRestaurantContext =
  createContext<SelectedRestaurantContextType>(
    {} as SelectedRestaurantContextType,
  );

export default function SelectedRestaurantContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<google.maps.places.Place>({} as google.maps.places.Place);

  const updateSelectedRestaurant = (place: google.maps.places.Place) => {
    if (place?.id === selectedRestaurant?.id) {
      setSelectedRestaurant({} as google.maps.places.Place);
    } else {
      setSelectedRestaurant(place);
    }
  };

  return (
    <SelectedRestaurantContext.Provider
      value={{ selectedRestaurant, updateSelectedRestaurant }}
    >
      {children}
    </SelectedRestaurantContext.Provider>
  );
}
