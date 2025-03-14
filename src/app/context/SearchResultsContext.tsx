import { createContext, useState } from "react";
import { SearchActionNewResponseShape } from "@/types/SearchActionTypes";

type SearchResultsContextType = {
  searchResults: SearchActionNewResponseShape;
  resetResults: (newResults: SearchActionNewResponseShape | null) => void;
  addMoreResults: (newResults: SearchActionNewResponseShape) => void;
};
export const SearchResultsContext = createContext<SearchResultsContextType>(
  {} as SearchResultsContextType,
);

export default function SearchResultsContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [searchResults, setSearchResults] = useState(
    {} as SearchActionNewResponseShape,
  );

  const resetResults = (newResults: SearchActionNewResponseShape | null) => {
    if (newResults) {
      setSearchResults(newResults);
    } else {
      setSearchResults({} as SearchActionNewResponseShape);
    }
  };

  const addMoreResults = (newResults: SearchActionNewResponseShape) => {
    setSearchResults((prev) => ({
      ...prev,
      places: [...(prev.places || []), ...(newResults.places || [])],
      nextPageToken: newResults.nextPageToken,
      status: newResults.status,
    }));
  };

  return (
    <SearchResultsContext.Provider
      value={{ searchResults, addMoreResults, resetResults }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
}
