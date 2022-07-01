import "./style/contacts.scss";
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/user.context";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebase.utils";
import { ChatContext } from "../../../context/ChatProvider";

function Contacts() {
    const { joinRoom } = useContext(ChatContext);
    const { currentUser } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const userCollection = collection(db, "users");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollection);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
        console.log(currentUser, "current user");
    }, []);

    console.log(users, "all users");

    return (
        <ul>
            {users
                ?.filter((i) => i.email !== currentUser.email)
                .map((user, index) => (
                    <li
                        key={index}
                        onClick={() => joinRoom(user.email)}
                        style={{ cursor: "pointer" }}
                        className="contacts-li"
                    >
                        <img src={user.userData} />
                        <p>
                            {console.log("userrrrrrr", user)}
                            {user.displayName ? user.displayName : user.email}
                        </p>
                    </li>
                ))}
        </ul>
    );
}

export default Contacts;
