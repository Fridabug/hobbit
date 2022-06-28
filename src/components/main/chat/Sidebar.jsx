// import React, { useState } from "react";
// // import { Tab, Nav, Button, Modal } from "react-bootstrap";
// import Conversations from "./Conversations";
// import Contacts from "./Contacts";
// import NewContactModal from "./NewContactModal";
// import NewConversationModal from "./NewConversationModal";
// import {NavLink} from 'react-router-dom'

// const CONVERSATIONS_KEY = "conversations";
// const CONTACTS_KEY = "contacts";

// export default function Sidebar({ id }) {
//     const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY);
//     const [modalOpen, setModalOpen] = useState(false);
//     const conversationsOpen = activeKey === CONVERSATIONS_KEY;

//     function closeModal() {
//         setModalOpen(false);
//     }

//     return (
//         <div style={{ width: "250px" }} className="d-flex flex-column">
//             <div activeKey={activeKey} onSelect={setActiveKey}>
//                 <ul variant="tabs" className="justify-content-center">
//                     <li>
//                         <NavLink eventKey={CONVERSATIONS_KEY}>
//                             Conversations
//                         </NavLink>
//                     </li>
//                     <li>
//                         <NavLink eventKey={CONTACTS_KEY}>Contacts</NavLink>
//                     </li>
//                 </ul>
//                 <ul className="border-right overflow-auto flex-grow-1">
//                     <li eventKey={CONVERSATIONS_KEY}>
//                         <Conversations />
//                     </li>
//                     <li eventKey={CONTACTS_KEY}>
//                         <Contacts />
//                     </li>
//                 </ul>
//                 <div className="p-2 border-top border-right small">
//                     Your Id: <span className="text-muted">{id}</span>
//                 </div>
//                 <button
//                     onClick={() => setModalOpen(true)}
//                     className="rounded-0"
//                 >
//                     New {conversationsOpen ? "Conversation" : "Contact"}
//                 </button>
//             </div>

//             <div show={modalOpen} onHide={closeModal}>
//                 {conversationsOpen ? (
//                     <NewConversationModal closeModal={closeModal} />
//                 ) : (
//                     <NewContactModal closeModal={closeModal} />
//                 )}
//             </div>
//         </div>
//     );
// }