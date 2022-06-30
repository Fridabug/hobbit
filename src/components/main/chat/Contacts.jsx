import React, {useContext, useState, useEffect} from 'react'

import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebase.utils';

import {ChatContext} from '../../../context/ChatProvider'
import {UserContext} from '../../../context/user.context'

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
    }, []);

    return (
        <ul>
            {users
                ?.filter((i) => i.email !== currentUser.email)
                .map((user, index) => (
                    <li
                        key={index}
                        onClick={() => joinRoom(user.email)}
                        style={{ cursor: "pointer" }}
                    >
                        {user.displayName ? user.displayName : user.email}
                    </li>
                ))}
        </ul>
    );
}

export default Contacts;
