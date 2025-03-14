"use client";

import { useContext } from "react";
import { useInView } from "react-intersection-observer";
import { useMap } from "@vis.gl/react-google-maps";

import { SearchResultsContext } from "@/app/context/SearchResultsContext";
import { SelectedRestaurantContext } from "@/app/context/SelectedRestaurantContext";
import { nextPageSearchNew } from "@/app/actions";

import RestaurantCard from "./RestaurantCard";
import RestaurantCardSkeleton from "./RestaurantCardSkeleton";

export default function RestaurantCardList() {
  const map = useMap();
  const { searchResults, addMoreResults } = useContext(SearchResultsContext);
  const { updateSelectedRestaurant } = useContext(SelectedRestaurantContext);
  const { ref: skeletonLoaderRef } = useInView({
    onChange: (inView) => {
      if (inView) {
        handleFetchMore();
      }
    },
  });

  const handleFetchMore = async () => {
    if (searchResults?.nextPageToken) {
      const moreResults = await nextPageSearchNew(
        searchResults.nextPageToken,
        searchResults.originalQueryParams,
      );
      if (moreResults) {
        addMoreResults(moreResults);
      }
    }
  };

  const handleSelectRestaurant = (placeData: google.maps.places.Place) => {
    updateSelectedRestaurant(placeData);
    if (placeData.location) {
      map?.setCenter({
        lat: placeData.location.latitude,
        lng: placeData.location.longitude,
      });
    }
  };

  return (
    <div className="h-full w-full sm:w-[480px] bg-gray-200 overflow-y-auto no-scrollbar px-6 py-8 space-y-6">
      {!searchResults.status && (
        <div className="flex justify-center items-center">
          <span className="text-gray-400">Search for restaurants</span>
        </div>
      )}
      {searchResults.status === 200 && searchResults.places.length === 0 && (
        <div className="flex justify-center items-center">
          <span className="text-gray-700">
            Oops, we found no results for that search.
          </span>
        </div>
      )}
      {searchResults.status && searchResults.status !== 200 && (
        <div className="flex justify-center items-center">
          <span className="text-gray-700">Oops, something went wrong.</span>
        </div>
      )}

      {searchResults?.places?.map((place) => (
        <div key={place.id} className="w-full">
          <RestaurantCard
            key={place.id}
            placeData={place}
            handleSelectRestaurant={handleSelectRestaurant}
          />
        </div>
      ))}

      {searchResults?.places?.length > 0 && searchResults?.nextPageToken && (
        <div ref={skeletonLoaderRef} className="space-y-6">
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
          <RestaurantCardSkeleton />
        </div>
      )}
    </div>
  );
}
