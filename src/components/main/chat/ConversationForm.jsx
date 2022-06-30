import React, { useContext } from "react";
import { ChatContext } from "../../../context/ChatProvider";
function ConversationForm() {
    const { sendMessage } = useContext(ChatContext);
    return (
        <form
            onSubmit={sendMessage}
            style={{ display: "flex", justifyContent: "space-between" }}
        >
            <textarea
                name="message"
                placeholder="type your message here"
                style={{ width: "80%" }}
            ></textarea>
            <button type="submit" style={{ width: "20%" }}>
                Send
            </button>
        </form>
    );
}

export default ConversationForm;
