import React, { useContext, useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Conversation from "./Conversation";
import { ChatContext } from "../../../context/ChatProvider";
import { UserContext } from "../../../context/user.context";
import Home from "../home/Home";

function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const { sender, setSender, receiver, setReceiver } =
        useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    const { room, setRoom } = useContext(ChatContext);
    const handleChatClose = () => {
        setRoom(null)
    };

    useEffect(() => {
        setUserInfo();
    }, [currentUser]);

    return (
        <div className="dashboard-container" style={{ display: "flex" }}>
            <Sidebar style={{ width: "15%", height: "100vh" }} />
            {room && <Conversation handleChatClose={handleChatClose}/>}
        </div>
    );
}

export default Dashboard;
