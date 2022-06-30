import React, {useContext} from 'react'
import Sidebar from './Sidebar'
import Conversation from './Conversation'
import {ChatContext} from '../../../context/ChatProvider'


function Dashboard() {
  const {sender, setSender, receiver, setReceiver} = useContext(ChatContext);

  const handleChatClose = () => {
    setSender(null);
    setReceiver(null);
  }
    
  return (
    <div className='dashboard-container' style={{display: 'flex'}}>
        <Sidebar style={{width: '15%', height: '100vh'}}/>
        {sender && receiver && <Conversation handleChatClose={handleChatClose}/>}
    </div>
  )
}

export default Dashboard