import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/main/chat/Dashboard";
import Home from "./components/main/home/Home";
import Profile from "./components/main/profile/Profile";
import Authentication from "./components/authentication/authentication";
import Context from "./context/contextProvider";
import EditProfile from "./components/main/profile/EditProfile";
import { UserContext } from "./context/user.context";
function App() {
    const { profileSwitch } = useContext(Context);
    const { currentUser } = useContext(UserContext);
    return (
        <div className="App">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Authentication />} />
                <Route path="/dashboard" element={<Dashboard />} />

                <Route
                    path="/profile"
                    element={profileSwitch ? <Profile /> : <EditProfile />}
                />
            </Routes>
        </div>
    );
}

export default App;
