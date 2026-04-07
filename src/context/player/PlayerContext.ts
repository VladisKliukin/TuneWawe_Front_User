import {createContext} from "react";
import type {PlayerContextType} from "./PlayerTypes.ts";

export const PlayerContext = createContext<PlayerContextType | null>(null);
