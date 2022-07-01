import "./style/sidebar.scss";
import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarContext } from "../../../context/SidebarContext";
import Conversation from "./Conversation";
import Contacts from "./Contacts";
import { auth } from "../../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/user.context";
import Button from "../../UI/Button";
// for --> userDate --> here below
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebase.utils";
function Sidebar() {
    const { isContactsOpen } =
        useContext(SidebarContext);
   
    const { currentUser, sortedUsers } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/");
    };
    // uri: get user data --> i wasn't sure if to put it in the context so i added it here to the file

    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
            const gettingUser = async () => {
                const data = await getDoc(docRef);
                setUserData(data.data());
            };
            gettingUser();
        }
    }, [currentUser]);

    return (
        <div className="sidebar-wrapper">
            <div className="profile">
                <img src={userData?.userData.image} />
                <h3>{userData?.displayName} </h3>
            </div>
            <div className="exit-button"></div>
            {/* <div className="sidebar-content-container"> */}
            {isContactsOpen ? <Contacts /> : <Conversation />}
            <Button
                onClick={handleLogout}
                name="logout"
                className="sidebar-button"
            />
            {/* </div> */}
            <Outlet />
        </div>
    );
}
export default Sidebar;
