import {Route, Routes, useLocation} from "react-router-dom";
import DisplayHome from "./DisplayHome.tsx";
import DisplayAlbum from "./DisplayAlbum.tsx";
import Search from "./Search.tsx";
import Navbar from "./Navbar.tsx";
import {usePlayer} from "../context/player/usePlayer.ts";
import {useEffect, useRef} from "react";

const Display = () => {
    const {albumsData} = usePlayer();
    const displayRef = useRef<HTMLDivElement>(null);
    const location = useLocation()
    const isAlbum = location.pathname.includes("album")
    const albumId = isAlbum ? location.pathname.split("/").pop() : "";
    const bgColor = isAlbum ? albumsData.find(x => x._id === albumId)?.bgColor : "#121212";

    useEffect(() => {
        if (isAlbum && displayRef.current) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
        }
       if (!isAlbum && displayRef.current) {
            displayRef.current.style.background = `#121212`;
        }
    },[isAlbum,bgColor]);
    return (

        <div className="w-[100%] m-2 bg-[#121212] text-white lg:w-[75%] lg:ml-0 flex flex-col">
            {/*Sticky navbar*/}
            <div ref={displayRef}
                className="sticky top-0 z-10 bg-[#121212]/95 backdrop-blur-sm border-b border-gray-800/50 px-6 pt-4 pb-2 ">
                <Navbar/>

                {/*Scrollable content*/}
                <div className="flex-1 px-6 pb-4 overflow-auto">
                    <Routes>
                        <Route path="/" element={<DisplayHome/>}/>
                        <Route path="/album/:id"
                               element={<DisplayAlbum album={albumsData.find(x => x._id === albumId)}/>}/>
                        <Route path="/search" element={<Search/>}/>
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Display;