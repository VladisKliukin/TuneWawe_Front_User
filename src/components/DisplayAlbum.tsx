import type {Album} from "../context/player/PlayerTypes.ts";

import {Clock} from "lucide-react";
import {usePlayer} from "../context/player/usePlayer.ts";
import AlbumStats from "./AlbumStats.tsx";

export type DisplayAlbumProps = {
    album: Album | undefined;
};

const DisplayAlbum = ({album}: DisplayAlbumProps) => {

    const {songsData} = usePlayer();

    return album ? (
        <>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end ">
                <img src={album.imageUrl} alt={album.name} className="w-48 rounded"/>
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        {album.name}
                    </h2>
                    <h4>{album.desc}</h4>



                </div>

            </div>
            <div className="mt-3 flex justify-end ">
                <AlbumStats album={album}/>
            </div>
            {/* List song */}

            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                <p>
                    <b className="mr-4">#</b>
                </p>
                <p>Album</p>
                <p className="hidden sm:block">Data added</p>
                <Clock className="m-auto w-4"/>
            </div>
            <hr/>
            {songsData.filter(song => song.album === album.name)
                .map((song, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-3 sm:grid-cols-4 gap-2 p2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer mt-5">
                        <p className="text-white">
                            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                            <img src={song.image} alt="" className="inline w-15 mr-5"/>
                        </p>
                        <p className="text-[15px]">{song.album}</p>
                        <p className="text-[15px] hidden sm:block">5 days ago</p>
                        <p className="text-[15px] text-center">{song.duration}</p>
                    </div>
                ))
            }

        </>
    ) : null;

};

export default DisplayAlbum;