"use client";

import { FormEvent, useContext, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";

import { searchActionNew } from "@/app/actions";
import SearchIcon from "@/assets/icons/Search--Streamline-Ionic-Filled.svg";
import { SearchResultsContext } from "@/app/context/SearchResultsContext";
import Spinner from "./Spinner";
import { LocationBias } from "@/types/SearchActionTypes";

export default function SearchInput() {
  const [isLoading, setIsLoading] = useState(false);
  const map = useMap();
  const { resetResults } = useContext(SearchResultsContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLoading) return;
    const formData = new FormData(event?.currentTarget);
    const searchText: string = (
      formData.get("places-api-search") as string
    ).trim();
    // ^awkward type cast when relying on FormData

    if (!searchText) {
      return;
    }
    setIsLoading(true);

    const locationBias: LocationBias = {};
    const bounds = map?.getBounds();
    // map will not have bounds if page loads in mobile list view
    if (bounds) {
      const ne = bounds?.getNorthEast().toJSON();
      const sw = bounds?.getSouthWest().toJSON();
      locationBias.rectangle = {
        high: {
          latitude: ne.lat,
          longitude: ne.lng,
        },
        low: {
          latitude: sw.lat,
          longitude: sw.lng,
        },
      };
    } else {
      const center = map?.getCenter()?.toJSON();
      if (center) {
        locationBias.circle = {
          center: {
            latitude: center.lat,
            longitude: center.lng,
          },
          radius: 10000.0, // 10km
        };
      }
    }

    const searchResults = await searchActionNew(searchText, locationBias);
    resetResults(searchResults);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" noValidate={true}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
          <SearchIcon className="text-theme-blue-900" />
        </div>
        <input
          type="text"
          id="places-api-search"
          name="places-api-search"
          placeholder="Search restaurants"
          className="block w-[353px] sm:w-[327px] p-4 ps-10 h-[32px] text-[13px] bg-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-blue-900 transition ease-in-out duration-150"
        />
      </div>
      {isLoading && (
        <div className="w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex justify-center items-center">
          <Spinner />
        </div>
      )}
    </form>
  );
}
