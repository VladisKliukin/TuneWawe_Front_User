import {Toaster} from "react-hot-toast";
import Display from "./components/Display.tsx";
import AuthWrapper from "./components/AuthWrapper.tsx";

const App = () => {
    return (
        <>
            <Toaster/>
            <AuthWrapper>
                <Display/>
            </AuthWrapper>
        </>
    )
}

export default App;