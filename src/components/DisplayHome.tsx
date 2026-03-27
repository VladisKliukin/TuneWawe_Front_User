import {useAuth} from "../context/auth/useAuth.ts";

const DisplayHome = () =>{

    const {logout} = useAuth();

    return(
        <>
        <div>Dispay the albums and song</div>
        <button
        className="bg-red-500 hover:bg-red-700 py-1 px-3 rounded-2xl text-white text-[15px] cursor-pointer transition-colors flex items-center gap-1"
            onClick={logout}>exit</button>
        </>
    )
}
export default DisplayHome;