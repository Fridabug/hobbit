import { createContext, useState, useEffect, useContext } from "react";
import {
    collection,
    getDocs,
    getDoc,
    doc,
    addDoc,
    deleteDoc,
} from "firebase/firestore";
import { UserContext } from "./user.context";
import { db } from "../utils/firebase/firebase.utils";
import io from "socket.io-client";

import shortid from "shortid";

export const ChatContext = createContext();
const socket = io("https://hobbys-chat-engine.herokuapp.com");
export const ChatProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const [room, setRoom] = useState(null);
    console.log(room, "ROOM");
    const [receiver, setReceiver] = useState(null);
    const [sender, setSender] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setRoom((state) => {
                console.log(
                    state,
                    "........................................................"
                );
                return {
                    ...state,
                    messages: [...state.messages, data],
                };
            });
        });
    }, []);
    console.log(room, "rooooooooooooom");

    const joinRoom = async (receiver) => {
        const chatsCol = collection(db, "chats");
        setReceiver(receiver);
        const chatSnapshot = await getDocs(chatsCol);
        const room = chatSnapshot.docs
            .map((doc) => doc.data())
            .find(
                (doc) =>
                    (doc?.receiver === receiver &&
                        doc?.sender === currentUser.email) ||
                    (doc?.receiver === currentUser.email &&
                        doc?.sender === receiver)
            );

        if (room) {
            setRoom(room);
            socket.emit("join_room", room.id);
            console.log(room, "find room");
        } else {
            const id = shortid.generate();
            const newChat = {
                messages: [
                    {
                        content: "Hey there 👋",
                        sender: "Bot",
                        date: new Date().toString(),
                    },
                ],
                receiver: receiver,
                sender: currentUser.email,
                id,
            };
            await addDoc(collection(db, "chats"), newChat);
            joinRoom(receiver);
        }
    };
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

    const sendMessage = async (e) => {
        e.preventDefault();
        const content = e.target.message.value;

        const data = {
            room: room.id,
            content,
            date: new Date().toDateString(),
            sender: currentUser?.email,
        };
        setRoom((state) => ({ ...state, messages: [...state.messages, data] }));
        e.target.reset();
        await socket.emit("send_message", data);
    };

    const value = {
        receiver,
        setReceiver,
        sender,
        setSender,
        joinRoom,
        room,
        sendMessage,

        setRoom,
    };
    return (
        <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
    );
};
