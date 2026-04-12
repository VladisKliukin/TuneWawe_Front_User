import {assets} from "../assets/assets.ts";
import {Heart, ListMusic, Timer} from "lucide-react";
import type {Album} from "../context/player/PlayerTypes.ts";
import {usePlayer} from "../context/player/usePlayer.ts";
import {useAuth} from "../context/auth/useAuth.ts";
import axios from "axios";
import {API_BASE_URL} from "../context/auth/constants.ts";

export type AlbumStatsProps = {
    album: Album | undefined;
};



const AlbumStats = ({album}: AlbumStatsProps) => {
    const {songsData, updateAlbumInState} = usePlayer();

    const { getAuthHeaders } = useAuth();

    const toggleLikeAlbum = async () => {
        if (!album?._id) return;

        try {
            const response = await axios.patch<Album>(
                `${API_BASE_URL}/api/albums/${album._id}/like`,
                {},
                {
                    headers: getAuthHeaders() ?? undefined,
                }
            );
            updateAlbumInState(response.data);
        } catch (error) {
            console.error("Failed to toggle like album", error);
        }
    };

    //----------------------------------------------------------------------------------------------
    const getTotalAlbumDuration = () => {
        let totalSeconds = 0;




        songsData.forEach((song) => {
            if (song.album === album?.name) {
                const [minutes, seconds] = song.duration.split(":").map(Number);
                totalSeconds += minutes * 60 + seconds;
            }
        });

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours}h : ${minutes}m : ${seconds}s`;
        }

        return `${minutes}m : ${seconds}s`;
    };
    //----------------------------------------------------------------------------------------------
    const getAlbumSongsCount = () => {
        let totalSong = 0;
        songsData.forEach((song) => {
            if (song.album === album?.name) {
                totalSong++;
            }
        });
        return totalSong;
    };

    return (
        <div>
            <div className="flex p-4 bg-black/40 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg  ">
                <img src={assets.logo} alt="Logo" className="inline-block w-8 mr-1" />
                <b>TuneWave</b> <Heart className="w-6 h-6 fill-white text-black/50 ml-5 transition-all hover:scale-120 cursor-pointer"   onClick={() => toggleLikeAlbum()}/> <b
                className="ml-1">{album?.likedUserIds.length}</b> <ListMusic className="ml-5"/> <b className="ml-1"> {getAlbumSongsCount()}
                <b className="ml-1"> Songs</b>  </b> <Timer className="ml-5"/> <b className="ml-1">{getTotalAlbumDuration()}</b>

            </div>
        </div>
    )
}
export default AlbumStats;
