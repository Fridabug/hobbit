import React from 'react'
import Sidebar from './Sidebar'
import Conversation from './Conversation'


function Dashboard() {
    
  return (
    <div className='dashboard-container' style={{display: 'flex'}}>
        <Sidebar style={{width: '15%', height: '100vh'}}/>
        <Conversation />
    </div>
  )
}

export default Dashboard