import React from 'react'
import ConversationForm from './ConversationForm'

function Conversation() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid black', width: '100%'}}>
      <div className='display-msg-container' style={{border: '1px solid black', height: '100%'}}>Display Messages</div>
      <div className='send-msg-container' style={{border: '1px solid black'}}>
      <ConversationForm/>
      </div>
    </div>
  )
}

export default Conversation