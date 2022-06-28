import React from "react";
import { ListGroup } from "react-bootstrap";
import { useConversations } from "../../../context/ConversationsProvider";

// export default function Conversations() {
//     const { conversations, selectConversationIndex } = useConversations();

//     return (
//         <ul variant="flush">
//             {conversations.map((conversation, index) => (
//                 <li
//                     key={index}
//                     action
//                     onClick={() => selectConversationIndex(index)}
//                     active={conversation.selected}
//                 >
//                     {conversation.recipients.map((r) => r.name).join(", ")}
//                 </li>
//             ))}
//         </ul>
//     );
// }

export default function Conversations() {
    const { conversations, selectConversationIndex } = useConversations();

    return (
        <ListGroup variant="flush">
            {conversations.map((conversation, index) => (
                <ListGroup.Item
                    key={index}
                    action
                    onClick={() => selectConversationIndex(index)}
                    active={conversation.selected}
                >
                    {conversation.recipients.map((r) => r.name).join(", ")}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
}
