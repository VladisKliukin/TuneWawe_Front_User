import {createContext} from "react";
import type {SearchContextType} from "./SearchType.ts";
export const SearchContext = createContext<SearchContextType|null>(null);

