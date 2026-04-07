import {useContext} from "react";
import {PlayerContext} from "./PlayerContext.ts";

export const usePlayer = () => {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error("usePlayer must be used within the PlayerProvider");
    }

    return context;
};
