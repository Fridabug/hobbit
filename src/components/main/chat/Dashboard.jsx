import React, {useContext} from 'react'
import Sidebar from './Sidebar'
import Conversation from './Conversation'
import {ChatContext} from '../../../context/ChatProvider'


function Dashboard() {
  const {sender, receiver} = useContext(ChatContext);
    
  return (
    <div className='dashboard-container' style={{display: 'flex'}}>
        <Sidebar style={{width: '15%', height: '100vh'}}/>
        {sender && receiver && <Conversation />}
    </div>
  )
}

export default Dashboard