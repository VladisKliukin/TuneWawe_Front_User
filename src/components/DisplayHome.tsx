import {usePlayer} from "../context/player/usePlayer.ts";
import AlbumItem from "./AlbumItem.tsx";
import SongItem from "./SongItem.tsx";

const DisplayHome = () => {
    const {songsData, albumsData} = usePlayer();
    return (
        <>
            {/*------------------------------------------------------------------------------------------------*/}
            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                <div className="flex overflow-auto">
                    {/*    DIsplay the albums data*/}

                    {albumsData.map((item, index) => (
                        <AlbumItem
                            key={index}
                            name={item.name}
                            desc={item.desc}
                            _id={item._id}
                            image={item.imageUrl}
                        />
                    ))}

                </div>
            </div>
            {/*------------------------------------------------------------------------------------------------*/}
            <div className="bm-4">
                <h1 className="my-5 font-bold text-2xl">Today`s diggest hits</h1>
                <div className="flex overflow-auto">
                    {/*    Display the songs data*/}
                    {songsData.map((item, index) => (
                        <SongItem
                        key={index}
                        _id={item._id}
                        name={item.name}
                        desc={item.desc}
                        album={item.album}
                        image={item.image}
                        audio={item.audio}
                        duration={item.duration}
                        />
                    ))}
                </div>
            </div>

        </>
    )
}
export default DisplayHome;