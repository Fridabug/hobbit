import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth, } from '../utils/firebase/firebase.utils';
import {useNavigate} from 'react-router-dom'


import { collection, getDocs} from 'firebase/firestore';
import { db } from '../utils/firebase/firebase.utils';

//actual value you want to access
export const UserContext = createContext({
    createUser: null,
    setCurrentUser: () => null
});

const userCollection = collection(db, 'users');

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    //from eszter
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    console.log(currentUser, 'this current user');

    // useEffect(() => {
    //     const auth = onAuthStateChangedListener((user) => {
    //         setCurrentUser(user);
    //         setLoading(false);
    //         if(user) navigate('/dashboard');
    //     });

    //     return auth;
    // }, [currentUser, navigate])

    // hobbies of the current user
    const [hobbies, setHobbies] = useState([])
    // Array of ticked checkboxes
    const [query, setQuery] = useState([])
    const [sortedUsers, setSortedUsers] = useState([]);

    const [users, setUsers] = useState([]);
    const value = { currentUser, setCurrentUser, users, hobbies, setHobbies, query, setQuery, sortedUsers };
    // const value = { currentUser, setCurrentUser, users };

    useEffect(() => {
        const getUsers = async () => {
          const data = await getDocs(userCollection);
          // console.log(data)
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
  
        getUsers()
    }, [])


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, [])


    // Hobbies
      
    useEffect(() => {
        if(currentUser){
          const usersArr = users.filter(user => user?.userData?.hobbies?.some((hobby) => query.includes(hobby)))
          console.log('usersArr: ', usersArr)
          setSortedUsers(usersArr)
        }
    }, [query])

    return <UserContext.Provider value={value} >{children}</UserContext.Provider>
}