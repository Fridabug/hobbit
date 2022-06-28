import React, {useContext} from "react";
import Sidebar from "./Sidebar";
import OpenConversation from "./OpenConversation";
import { useConversations } from "../../../context/ConversationsProvider";
import {UserContext } from "../../../context/user.context"

export default function Dashboard({ id }) {

    const {currentUser} = useContext(UserContext);
    const { selectedConversation } = useConversations();
    console.log(selectedConversation, 'test')
    return (
        <div className="d-flex" style={{ height: "100vh" }}>
            {/*<Sidebar id={currentUser.id} /> */}
            {selectedConversation && <OpenConversation/>}
        </div>
    );
}