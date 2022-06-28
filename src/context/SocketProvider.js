import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import {UserContext} from '../context/user.context'
const SocketContext = React.createContext();
export function useSocket() {
    return useContext(SocketContext);
}
export function SocketProvider({ id, children }) {

const {currentUser} = useContext(UserContext);


    const [socket, setSocket] = useState();
        useEffect(() => {
            if(currentUser) {
                const newSocket = io("https://hobbys-chat-engine.herokuapp.com", {
                    query: { id: currentUser.id },
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