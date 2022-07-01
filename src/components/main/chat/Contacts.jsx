import "./style/contacts.scss";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user.context";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebase.utils";
import { ChatContext } from "../../../context/ChatProvider";
import "./contacts.styles.scss";
import { BsFillTrashFill } from "react-icons/bs";
function Contacts() {
    const { joinRoom, clickedChatWhenNotSender, setRoom } =
        useContext(ChatContext);
    const { currentUser, contacts, setContacts } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const userCollection = collection(db, "users");
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollection);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);

    const handleDeleteFromContacts = (index) => {
        const updatedContacts = contacts.filter((contact, i) => index !== i);
        setContacts(updatedContacts);
        // setRoom(false);
    };
    console.log(contacts);
    return (
        <ul>
            {contacts
                ?.filter((i) => i.email !== currentUser.email)
                .map((user, index) => (
                    <li
                        key={index}
                        onClick={() => joinRoom(user.email)}
                        style={{ cursor: "pointer" }}
                        className="contacts-li"
                    >
                        <img src={user.userData?.image} />
                        <p>
                            {user.displayName ? user.displayName : user.email}
                        </p>
                        <button onClick={() => handleDeleteFromContacts(index)}>
                            <BsFillTrashFill className="btn-trash-icon" />
                        </button>
                    </li>
                ))}
        </ul>
    );
}

export default Contacts;
