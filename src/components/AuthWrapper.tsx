import {type ReactNode, useState} from "react";
import {useAuth} from "../context/auth/useAuth.ts";
import Register from "./Register.tsx";
import Login from "./Login.tsx";

type AuthWrapperProps = {
    children: ReactNode;
};

const AuthWrapper = ({children}: AuthWrapperProps) => {
    const {isAuthenticated, loading} = useAuth();
    const [showRegister, setShowRegister] = useState<boolean>(false);

    if (loading) {
        return (
            <div   className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 flex items-center justify-center p-4">
                <div className="text-centr">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 max-auto mb-4"></div>
                    <p className="text-white text-lg">Loading...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated()) {
        return showRegister ?
            (<Register onSwitchToLogin={() => setShowRegister(false)}/>) :
            (<Login onSwitchToRegister={() => setShowRegister(true)}/>)
    }

    return <>{children}</>;
};

export default AuthWrapper;
