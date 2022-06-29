import { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListener, createUserDocumentFromAuth, } from '../utils/firebase/firebase.utils';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase.utils';

//actual value you want to access
export const UserContext = createContext({
    createUser: null,
    setCurrentUser: () => null
});

const userCollection = collection(db, 'users');

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const value = { currentUser, setCurrentUser, users };

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollection);
          // console.log(data)
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
  
        getUsers()
    }, [])

    console.log(currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}


