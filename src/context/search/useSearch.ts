import {useContext} from "react";
import {SearchContext} from "./SearchContext.tsx";

export const useSearch = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw new Error("useSearch must be used within the SearchProvider");
    }

    return context;
}