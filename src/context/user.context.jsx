import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth, } from '../utils/firebase/firebase.utils';
import {useNavigate} from 'react-router-dom'


//actual value you want to access
export const UserContext = createContext({
    createUser: null,
    setCurrentUser: () => null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    //from eszter
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()


    useEffect(() => {
        const auth = onAuthStateChangedListener((user) => {
            setCurrentUser(user);
            setLoading(false);
            if(user) navigate('/chats');
        });

        return auth;
    }, [currentUser, navigate])

    const value = { currentUser, setCurrentUser};

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