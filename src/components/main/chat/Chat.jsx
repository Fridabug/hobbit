import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {ChatEngine} from 'react-chat-engine'
import { auth } from '../../../utils/firebase/firebase.utils'
import {UserContext} from '../../../context/user.context'
import axios from 'axios';

function Chats() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const {currentUser} = useContext(UserContext);

    console.log(currentUser);

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], 'userPhoto.jpg', {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!currentUser) {
            navigate('/');
            return;
        }

        fetch('https://api.chatengine.io/users/me', {
            mode: 'no-cors',
            headers: {
                'project-id': '60744f9d-908b-4d60-8584-3c7e40852120',
                'user-name': currentUser.email,
                'user-secret': currentUser.uid,
            }
        })
        .then(() => {
            setLoading(false)
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('email', currentUser.email);
            formdata.append('username', currentUser.email);
            formdata.append('secret', currentUser.uid);

            // getFile(currentUser.photoURL)
            //     .then((avatar) => {
            //         formdata.append('avatar', avatar, avatar.name);

                    fetch('https://api.chatengine.io/users/',
                        formdata,
                        {method: 'POST', headers: {'private-key': 'a314042f-b92c-4640-8681-e34296ea1bc5'}}
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                
                // })

        })
    }, [currentUser, navigate]);

    if(!currentUser || loading) return (
        <div>
            <p>Loading...</p>
            <button onClick={handleLogout} className='logout-tab'>
                Logout
            </button>
        </div>)
  return (
    <div className='chat-page'>
        <div className='nav-bar'>
            <div className='logo-tab'>
                Chat
            </div>
            <div onClick={handleLogout} className='logout-tab'>
                Logout
            </div>
        </div>
        <ChatEngine
            height='calc(100vh - 66px)'
            projectID= '60744f9d-908b-4d60-8584-3c7e40852120' 
            userName={currentUser.email}
            userSecret={currentUser.uid}
        />
    </div>
  )
}

export default Chats