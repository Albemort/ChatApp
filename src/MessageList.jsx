import { useEffect, useRef } from 'react'

// Käydään läpi messages -taulukko ja
// luodaan viestit käyttäjälle näkyviin.
const MessageList = ({ messages }) => {
    return (
      <div>
        {messages.map(message=> (
          <Message 
            key={message.id} 
            time={message.time} 
            text={message.text} 
            name={message.name} 
            isLast={message.id === messages.length - 1}
          />
        ))}
      </div>
    )
  }
  
  // Viestin esitysmuoto
  const Message = ({ time, text, name, isLast }) => {
    const messageRef = useRef();
  
    useEffect(() => {
      if (isLast) {
        messageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [isLast]);
  
    return (
      <div ref={messageRef}>
        {time} <strong>{name}:</strong> {text}
      </div>
    )
  }

export default MessageList;