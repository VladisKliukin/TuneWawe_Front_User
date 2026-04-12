import type {SongItemProps} from "../context/player/PlayerTypes.ts";
import {Play} from "lucide-react";
import {useLocation, useNavigate} from "react-router-dom";
import {useSearch} from "../context/search/useSearch.ts";
import {highlightText} from "../utils/highlight.tsx";

const SongItem = ({_id, name, desc, image}: SongItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const {searchQuery} = useSearch();
    const shouldHighlight = location.pathname === "/search" && searchQuery.trim().length > 0;
    return (
        <div  className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors"
              onClick={() => navigate(`/albums/${_id}`)}>
            <div className="relative w-60 h-60 group">
                <img src={image} alt="image" className="w-60 h-60 rounded border border-gray-800/50 object-cover"/>
                <div className="absolute inset-0 rounded bg-black/0 group-hover:bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                    <Play className="w-6 h-6 text-white fill-white " />
                </div>
            </div>
            <p className="font-bold mt-2 mb-1">{shouldHighlight ? highlightText(name, searchQuery) : name}</p>
            <p className="text-slate-200 text-sm">{shouldHighlight ? highlightText(desc, searchQuery) : desc}</p>
        </div>

    )
}
export default SongItem;
