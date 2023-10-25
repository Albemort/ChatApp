import { useState, useEffect } from 'react'
import UsernamePopup from './UsernamePopup'
import SendMessageForm from './SendMessageForm'
import MessageList from './MessageList'
import axios from 'axios'
import socketIO from 'socket.io-client'

const socket = socketIO.connect('http://localhost:3001')
const base_url = 'http://localhost:3001/api/messages'

const App = () => {
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState('')
  const [showPopup, setShowPopup] = useState(true)

  // Käsitellään palvelimelta saatu vastaus.
  // Lisätään vastaus messages -taulukkoon.
  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // Hae aiemmat viestit palvelimelta
    axios
      .get(base_url)
      .then(response => {
        // Muokkaa viestit sopivaan muotoon
        const formattedMessages = response.data.map(msg => ({
          id: msg.id,
          time: msg.time,
          text: msg.text,
          name: msg.name
        }))
        
        setMessages(formattedMessages);
      })
  }, [])

  // Tapahtumankäsittelijä, jolla lähetetään viesti palvelimelle.
  const handleSendMessage = (message) => {
    socket.emit('message', {
      name: username,
      text: message
    })
  }

  // Käsitellään PopUp -ikkunan sulkeminen.
  const handleClosePopup = (newUsername) => {
    setUsername(newUsername);
    setShowPopup(false);
  }

  return (
    <div className="app">

      {showPopup && <UsernamePopup onClose={handleClosePopup} />}

      <div className="app-inner">

        <MessageList messages={messages} />

      </div>
      <div className="input-area">

        <SendMessageForm onSendMessage={handleSendMessage} socket={socket}/>

      </div>
    </div>
  )
}

export default App
