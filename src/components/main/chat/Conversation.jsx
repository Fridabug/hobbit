import React from 'react'
import ConversationForm from './ConversationForm'

function Conversation({handleChatClose}) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid black', width: '100%'}}>
      <button onClick={handleChatClose} style={{width: '20px', alignSelf: 'flex-end'}}>X</button>
      <div className='display-msg-container' style={{border: '1px solid black', height: '100%'}}>Display Messages</div>
      <div className='send-msg-container' style={{border: '1px solid black'}}>
      <ConversationForm/>
      </div>
    </div>
  )
}

export default Conversation