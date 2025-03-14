import { useCallback, useContext } from "react";

import { Place } from "@/types/GooglePlacesLegacyApiTypes";
import StarIcon from "@/assets/icons/Star-S-Fill--Streamline-Remix-Fill.svg";
import { BookmarkedRestaurantsContext } from "@/app/context/BookmarkedRestaurantsContext";
import { SelectedRestaurantContext } from "@/app/context/SelectedRestaurantContext";
import BookmarkButton from "./BookmarkButton";
import Image from "next/image";

const getPlacePhotoURL = (resourceName: string) =>
  `https://places.googleapis.com/v1/${resourceName}/media?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&maxHeightPx=72`;

export default function RestaurantCard({
  placeData,
  handleSelectRestaurant,
  isInMapView,
}: {
  placeData: google.maps.places.Place;
  handleSelectRestaurant?: (place: google.maps.places.Place) => void;
  isInMapView?: boolean;
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const photoRef = useCallback(getPlacePhotoURL(placeData.photos?.[0].name), [
    getPlacePhotoURL,
    placeData,
  ]);

  const { bookmarkedRestaurants, handleToggleBookmarkRestaurant } = useContext(
    BookmarkedRestaurantsContext,
  );
  const { selectedRestaurant } = useContext(SelectedRestaurantContext);

  const handleBookmark = () => {
    if (placeData?.id) {
      handleToggleBookmarkRestaurant(placeData.id);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (handleSelectRestaurant) {
      handleSelectRestaurant(placeData);
    }
  };

  const isSelected = selectedRestaurant.id === placeData.id;

  return (
    <div
      onClick={handleClick}
      className={`${!isInMapView && "cursor-pointer"} ${
        isSelected && !isInMapView && "ring-2 ring-theme-blue-900"
      } h-[104px] rounded-[16px] bg-white shadow-lg p-4 transition ease-in-out duration-200 font-comfortaa`}
      tabIndex={0}
    >
      <div className="flex h-[72px] justify-between">
        <div className="flex max-w-[calc(100%-40px)] space-x-2">
          {photoRef ? (
            <Image
              src={photoRef}
              alt={`${placeData.displayName} thumbnail`}
              width={64}
              height={72}
              className="h-[72px] w-[64px] object-cover"
            />
          ) : (
            <div className="animate-pulse h-[72px] w-[64px]" role="status" />
          )}

          <div className="flex flex-col justify-around overflow-hidden">
            <div className="whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="text-[16px] text-mallard font-bold">
                {placeData.displayName.text}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[13px] text-mallard">
              <StarIcon className="text-theme-blue-400" />
              <span>{placeData.rating}</span>
              <span>•</span>
              <span className="text-siam">
                ({placeData.userRatingCount} reviews)
              </span>
            </div>
            <div className="text-siam text-[13px] overflow-hidden whitespace-nowrap text-ellipsis">
              {placeData.formattedAddress}
            </div>
          </div>
        </div>

        {placeData?.id && (
          <div>
            <BookmarkButton
              enabled={bookmarkedRestaurants[placeData.id]}
              handleClick={handleBookmark}
            />
          </div>
        )}
      </div>
    </div>
  );
}
