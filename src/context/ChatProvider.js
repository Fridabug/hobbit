import { createContext, useState, useEffect, useContext } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { UserContext } from "./user.context";
import { db } from "../utils/firebase/firebase.utils";
import io from "socket.io-client";

const socket = io("https://hobbys-chat-engine.herokuapp.com");

export const ChatContext = createContext();

// const chatCollection = collection(db, 'chats');
// console.log(chatCollection, 'chatCollection');


export const ChatProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [sender, setSender] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (currentUser) {
            const docRef = doc(db, "users", currentUser.uid);
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
        const response = await socket.emit("join_room", {
            receiver,
            sender: currentUser.email
            
        });
        console.log(response, "response");
        // console.log(socket);
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        const message = e.target.message.value;
        const data = { content: message, sender, receiver, time: new Date()};
        await socket.emit("send_message", data);
        console.log(data, 'data');
    };

    // try out ------------------------------- get unique chat id

    const [chats, setChats] = useState([]);
    const chatCollectionsRef = collection(db, 'chats');

    useEffect(() => {

        const getChats  = async () => {
            const data = await getDocs(chatCollectionsRef);
            setChats(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        }
        getChats()
    }, [])

      console.log(chats.map((chat) => chat.id))

    const value = {
        receiver,
        setReceiver,
        sender,
        setSender,
        joinRoom,
        sendMessage,
    };

    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};
