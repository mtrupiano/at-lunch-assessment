import { useContext } from "react";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

import PinIcon from "@/assets/icons/Map-Pin-Duotone--Streamline-Phosphor.svg";
import { SelectedRestaurantContext } from "@/app/context/SelectedRestaurantContext";
import RestaurantCard from "./RestaurantCard";
import { Place } from "@/types/GooglePlacesApiResponseType";

export default function MapMarker({
  placeData,
  fallbackZIndex,
}: {
  placeData: Place;
  fallbackZIndex: number;
}) {
  const { updateSelectedRestaurant, selectedRestaurant } = useContext(
    SelectedRestaurantContext,
  );

  const handleClick = () => {
    updateSelectedRestaurant(placeData);
  };

  const isSelected = selectedRestaurant?.id === placeData.id;

  return (
    <>
      <AdvancedMarker
        position={{
          lat: placeData.location?.latitude,
          lng: placeData.location?.longitude,
        }}
        zIndex={isSelected ? 9999 : fallbackZIndex} // somewhat hacky way to make sure the selected pin is showing 'above' overlapping pins
      >
        <div>
          {isSelected ? (
            <PinIcon
              className="cursor-pointer text-theme-blue-300"
              onClick={handleClick}
            />
          ) : (
            <PinIcon
              className="cursor-pointer text-white"
              onClick={handleClick}
            />
          )}
          {isSelected && (
            <div className="w-[375px] absolute left-1/2 transform -translate-x-1/2 -translate-y-[150px]">
              <RestaurantCard placeData={placeData} isInMapView={true} />
            </div>
          )}
        </div>
      </AdvancedMarker>
    </>
  );
}
