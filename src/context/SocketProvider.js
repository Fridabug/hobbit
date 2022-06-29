import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import {UserContext} from '../context/user.context'
const SocketContext = React.createContext();
export function useSocket() {
    return useContext(SocketContext);
}
export function SocketProvider({ id, children }) {

const {currentUser} = useContext(UserContext);
// console.log(currentUser, 'store');

    const [socket, setSocket] = useState();
        useEffect(() => {
            console.log(currentUser, 'currentUser')
            if(currentUser) {
                const newSocket = io("https://hobbys-chat-engine.herokuapp.com", {
                    query: { id: currentUser.uid },
        });
                setSocket(newSocket);
                return () => newSocket.close();
            }
           
    }, [currentUser]);

    return (
        <SocketContext.Provider value={socket}>
 {children}
 </SocketContext.Provider>
);
}