import {type ReactNode, startTransition, useDeferredValue, useMemo, useState} from "react";
import {SearchContext} from "./SearchContext.tsx";
import type {SearchContextType, SearchResult} from "./SearchType.ts";
import {usePlayer} from "../player/usePlayer.ts";

const MAX_RESULTS = 50;

export const SearchProvider = ({children}: { children: ReactNode }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const {songsData, albumsData} = usePlayer();

    const deferredQuery = useDeferredValue(searchQuery);
    const normalizedQuery = useMemo(() => deferredQuery.trim().toLowerCase(), [deferredQuery]);

    const [isSearchActive, setIsSearchActive] = useState(searchQuery.trim().length > 0);

    const searchResults: SearchResult | null = useMemo(() => {
        if (!normalizedQuery) return null;

        const includes = (value: string | null | undefined) =>
            (value ?? "").toLowerCase().includes(normalizedQuery);

        return {
            songs: songsData
                .filter((s) => includes(s.name) || includes(s.desc) || includes(s.album))
                .slice(0, MAX_RESULTS),
            albums: albumsData
                .filter((a) => includes(a.name) || includes(a.desc))
                .slice(0, MAX_RESULTS),
        };
    }, [normalizedQuery, songsData, albumsData]);

    const clearSearch = () => {
        startTransition(() => setSearchQuery(""));
    };

    const contextValue: SearchContextType = {
        searchQuery,
        setSearchQuery,
        searchResults,
        isSearchActive,
        setIsSearchActive,
        clearSearch,
    };

    return <SearchContext.Provider value={contextValue}>{children}</SearchContext.Provider>;

};
