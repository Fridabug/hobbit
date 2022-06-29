import { createContext, useState, useEffect, useContext } from 'react'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import {UserContext} from './user.context'
import { db } from '../utils/firebase/firebase.utils';
import io from "socket.io-client";

const socket = io("https://hobbys-chat-engine.herokuapp.com");

export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [sender, setSender] = useState(null);
    const {currentUser} = useContext(UserContext);

   
    
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

      const joinRoom = async (receiver) => {
        setSender(currentUser.email);
        setReceiver(receiver);
        const response = await socket.emit('join_room', {receiver, sender: currentUser.email});
        console.log(response, 'response');
        // console.log(socket);
      }


    const value = { receiver, setReceiver, sender, setSender, joinRoom };
    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    )
}