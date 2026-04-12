import type {Album, Song} from "../player/PlayerTypes.ts";
import type {Dispatch, SetStateAction} from "react";

export interface SearchContextType {
    searchQuery: string;
    setSearchQuery: Dispatch<SetStateAction<string>>;
    searchResults: SearchResult | null;
    isSearchActive: boolean;
    setIsSearchActive(isSearchActive: boolean): void;
    clearSearch: () => void;
};

export interface SearchResult {
    albums: Album[];
    songs: Song[];
}
