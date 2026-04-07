import type {ReactNode} from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import {PlayerContext} from "./PlayerContext.ts";
import type {Album, AlbumListResponse, PlayerContextType, Song, SongListResponse} from "./PlayerTypes.ts";
import {useAuth} from "../auth/useAuth.ts";
import {API_BASE_URL} from "../auth/constants.ts";

const PlayerProvider = ({children}: { children: ReactNode }) => {
    const [songsData, setSongsData] = useState<Song[]>([]);
    const [albumsData, setAlbumsData] = useState<Album[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const {user, token, getAuthHeaders} = useAuth();

    const getSongsData = async () => {
        setLoading(true);

        try {
            const response = await axios.get<SongListResponse>(`${API_BASE_URL}/api/songs`, {
                headers: getAuthHeaders() ?? undefined,
            });

            setSongsData(Array.isArray(response.data.songs) ? response.data.songs : []);
        } catch (error) {
            console.error("Failed to load songs", error);
            setSongsData([]);
        } finally {
            setLoading(false);
        }
    };

    const getAlbumsData = async () => {
        setLoading(true);

        try {
            const response = await axios.get<AlbumListResponse>(`${API_BASE_URL}/api/albums`, {
                headers: getAuthHeaders() ?? undefined,
            });

            setAlbumsData(Array.isArray(response.data.albums) ? response.data.albums : []);
        } catch (error) {
            console.error("Failed to load albums", error);
            setAlbumsData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {



        if (user && token) {
            getAlbumsData();
            getSongsData();
        }
    }, [user, token]);

    const contextValue: PlayerContextType = {
        songsData,
        albumsData,
        loading,
        getSongsData,
        getAlbumsData,
    };

    return <PlayerContext.Provider value={contextValue}>{children}</PlayerContext.Provider>;
};

export default PlayerProvider;
