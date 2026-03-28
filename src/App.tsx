import {Toaster} from "react-hot-toast";
import Display from "./components/Display.tsx";
import AuthWrapper from "./components/AuthWrapper.tsx";
import Sidebar from "./components/Sidebar.tsx";

const App = () => {
    return (
        <>
            <Toaster/>
            <AuthWrapper>
              <div className="h-screen bg-gradient-to-br from-purple-950 via-black to-purple-900">
                  <div className="h-[90%] flex" >
                      <Sidebar/>
                      <Display/>
                  </div>
              {/*    Player component*/}
              </div>
            </AuthWrapper>
        </>
    )
}

export default App;