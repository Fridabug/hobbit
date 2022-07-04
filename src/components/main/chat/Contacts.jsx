import './style/contacts.scss';
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../../context/user.context';
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../utils/firebase/firebase.utils';
import { ChatContext } from '../../../context/ChatProvider';
import './contacts.styles.scss';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillChatDotsFill } from 'react-icons/bs';
function Contacts() {
  const { joinRoom } = useContext(ChatContext);
  const { currentUser, setCurrentUser, contacts, setContacts } =
  useContext(UserContext);
  const [users, setUsers] = useState([]);
  const userCollection = collection(db, 'users');
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const docRef = doc(db, 'users', currentUser.uid);
    const gettingUser = async () => {
      const data = await getDoc(docRef);
      setUserData(data.data());
      const dataContacts = data.data();
      dataContacts.contacts && setContacts(dataContacts.contacts);
    };

    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    gettingUser();
    getUsers();
  }, [currentUser]);

  const handleDeleteFromContacts = (index) => {
    const updatedContacts = contacts.filter((contact, i) => index !== i);
    setContacts(updatedContacts);
    const updatedUser = userData;
    updatedUser.contacts = updatedContacts;
    const updateUser = async () => {
      const userDoc = doc(db, 'users', currentUser.uid);
      await updateDoc(userDoc, updatedUser);
    };
    updateUser();
    // setRoom(false);
  };

  return (
    <ul>
      {contacts
        ?.filter((contact, i) => {
          return contact.email !== currentUser?.email;
        })
        .map((user, index) => (
          <li key={index} className='contacts-li'>
            <img src={user.userData?.image} alt='profile' />
            <p>{user.displayName ? user.displayName : user.email}</p>
            <button onClick={() => handleDeleteFromContacts(index)}>
              <BsFillTrashFill className='btn-trash-icon icon' />
            </button>
            <button
              className='btn-letsChat-icon icon'
              style={{ cursor: 'pointer' }}
              onClick={() => joinRoom(user.email)}
            >
              <BsFillChatDotsFill />
            </button>
          </li>
        ))}
    </ul>
  );
}

export default Contacts;
