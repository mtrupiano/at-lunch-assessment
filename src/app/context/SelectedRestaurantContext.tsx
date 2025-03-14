import { Place } from "@/types/GooglePlacesApiResponseType";
import { createContext, useState } from "react";

type SelectedRestaurantContextType = {
  selectedRestaurant: Place;
  updateSelectedRestaurant: (place: Place) => void;
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
  const [selectedRestaurant, setSelectedRestaurant] = useState<Place>(
    {} as Place,
  );

  const updateSelectedRestaurant = (place: Place) => {
    if (place?.id === selectedRestaurant?.id) {
      setSelectedRestaurant({} as Place);
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
