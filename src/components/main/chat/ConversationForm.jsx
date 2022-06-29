import React from 'react'

function ConversationForm() {
  return (
    <form onSubmit={() => {}} style={{display: 'flex', justifyContent: 'space-between'}}>
      <textarea name='message' placeholder='type your message here' style={{width: '80%'}}></textarea>
      <button type='submit' style={{width: '20%'}}>Send</button>
    </form>
  )
}

export default ConversationForm