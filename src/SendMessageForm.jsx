// Tämä moduuli koostuu keskustelun viestien
// tapahtumankäsittelystä.

import { useState } from 'react';

const SendMessageForm = ({ onSendMessage }) => {
    const [message, setMessage] = useState("")
  
    const handleSubmit = (event) => {
      event.preventDefault()
      onSendMessage(message)
      setMessage("")
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          rows="1"
          className='input-inner'
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button className="b1" type="submit">Send</button>
      </form>
    )
  }

export default SendMessageForm;