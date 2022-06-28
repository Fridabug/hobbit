import React, {useState, useEffect, useContext} from 'react'
import io from "socket.io-client";
import {useNavigate} from 'react-router-dom'
import Contacts from './Contacts'
import Conversations from './Conversations'
import Dashboard from './Dashboard'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'
import { auth } from '../../../utils/firebase/firebase.utils'
import {UserContext} from '../../../context/user.context'
// import axios from 'axios';

function Chats() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {currentUser} = useContext(UserContext);

    console.log(currentUser);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    }

    // const getFile = async (url) => {
    //     const response = await fetch(url);
    //     const data = await response.blob();

    //     return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'})
    // }

    // useEffect(() => {
    //     if(!currentUser) {
    //         navigate('/');
    //         return;
    //     }

    //     fetch('https://hobbys-chat-engine.herokuapp.com', {
    //         mode: 'no-cors',
    //         headers: {
    //             'project-id': '60744f9d-908b-4d60-8584-3c7e40852120',
    //             'user-name': currentUser.email,
    //             'user-secret': currentUser.uid,
    //         }
    //     })
    //     .then(() => {
    //         setLoading(false)
    //     })
    //     .catch(() => {
    //         let formdata = new FormData();
    //         formdata.append('email', currentUser.email);
    //         formdata.append('username', currentUser.email);
    //         formdata.append('secret', currentUser.uid);

            // getFile(currentUser.photoURL)
            //     .then((avatar) => {
            //         formdata.append('avatar', avatar, avatar.name);

    //                 fetch('https://api.chatengine.io/users',
    //                     formdata,
    //                     {method: 'POST', headers: {'private-key': 'a314042f-b92c-4640-8681-e34296ea1bc5'}}
    //                 )
    //                 .then(() => setLoading(false))
    //                 .catch((error) => console.log(error))
                
    //             // })

    //     })
    // }, []);

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

console.log(socket, 'okay');

  return (
    <div className='chat-page'>
    <Dashboard/>
    </div>
  )
}

export default Chats