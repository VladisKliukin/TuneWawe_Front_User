import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AuthProvider from "./context/auth/AuthProvider.tsx";
import {BrowserRouter} from "react-router-dom";
import PlayerProvider from "./context/player/PlayerProvider.tsx";
import {SearchProvider} from "./context/search/SearchProvider.tsx";


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AuthProvider>
            <PlayerProvider>
                <SearchProvider>
                    <App/>
                </SearchProvider>
            </PlayerProvider>
        </AuthProvider>
    </BrowserRouter>
);
