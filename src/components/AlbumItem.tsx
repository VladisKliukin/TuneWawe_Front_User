import type {AlbumItemProps} from "../context/player/PlayerTypes.ts";
import {useNavigate} from "react-router-dom";
import {Play} from "lucide-react";

const AlbumItem = ({ name, desc, id, image }: AlbumItemProps) => {
    const navigate = useNavigate();
    return (
        <div
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] transition-colors"
            onClick={() => navigate(`/album/${id}`)}
        >
            <div className="relative w-60 h-60 group">
                <img src={image} alt="image" className="w-60 h-60 rounded border border-gray-800/50 object-cover"/>
                <div className="absolute inset-0 rounded bg-black/0 group-hover:bg-gradient-to-b from-black/70 via-black/30 to-transparent" />

                <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ">
                    <Play className="w-6 h-6 text-white fill-white " />
                </div>

            </div>

            <p className="font-bold mt-2 mb-1">{name}</p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    )
}



export default AlbumItem;