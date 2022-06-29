import { createContext, useState, useEffect, useContext } from 'react'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import {UserContext} from './user.context'
import { db } from '../utils/firebase/firebase.utils';


export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [sender, setSender] = useState(null);
    const {currentUser} = useContext(UserContext)
    
    useEffect(() => {
        if (currentUser) {
          const docRef = doc(db,'users', currentUser.uid);
          const gettingUser = async () => {
            const data = await getDoc(docRef);
            setUserData(data.data());
          };
          gettingUser();
        }
      }, [currentUser]);

      const joinRoom = (receiver) => {
        setSender(currentUser.email);
        setReceiver(receiver);
      }


    const value = { receiver, setReceiver, sender, setSender, joinRoom };
    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    )
}