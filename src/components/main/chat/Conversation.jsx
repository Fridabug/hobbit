import React, { useContext } from "react";
import ConversationForm from "./ConversationForm";
import { ChatContext } from "../../../context/ChatProvider";
import { UserContext } from "../../../context/user.context";
function Conversation({ handleChatClose }) {
    const { room, receiver } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                border: "1px solid black",
                width: "100%",
            }}
        >  <button onClick={handleChatClose} style={{width: '20px', alignSelf: 'flex-end'}}>X</button>
            <div>
                {" "}
                <span>To: {receiver}</span>
            </div>
            <div
                className="display-msg-container"
                style={{ border: "1px solid black", height: "100%" }}
            >
                <div>Display Messages</div>
                <div>
                    {room.messages?.map((msg, idx) => (
                        <div key={idx}>
                            <span>{msg?.content}</span> |{" "}
                            <span style={{ color: "green" }}>
                                {msg?.sender}
                            </span>{" "}
                            |
                            {typeof msg?.date === "string" && (
                                <span style={{ fontSize: 10 }}>
                                    {" "}
                                    {msg?.date}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div
                className="send-msg-container"
                style={{ border: "1px solid black" }}
            >
                <ConversationForm />
            </div>
        </div>
    );
}

export default Conversation;
