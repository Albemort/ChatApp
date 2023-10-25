const express = require('express')
const app = require('express')();
const cors = require('cors')

app.use(express.json())
app.use(cors())

const server = require('http').createServer(app)
const socketIO = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:5173"
  }
})

// Taulukko, johon tallennetaan viestit
let messages = []

// Muodosta socketio yhteys
socketIO.on('connection', (socket) => {
  console.log(`SocketIO: ${socket.id} user just connected!`)

  socket.on('message', (data) => {
    console.log(data)
  
    const message = {
      id: generateId(),
      name: data.name,
      text: data.text,
      time: getCurrentTime()
    }
  
    socketIO.emit('messageResponse', message)

    messages = messages.concat(message)
    console.log(message)
  })

  socket.on('disconnect', () => {
    console.log('SocketIO: A user disconnected')
  })
})

// Käsittele pyyntö asiakkaalta tuleva pyyntö ja
// palauta aiemmat viestit
app.get('/api/messages', (req, res) => {
    //console.log(messages)
    res.json(messages)
})

// Luo viesteille yksilöllinen id
const generateId = () => {
    const maxId = messages.length > 0
      ? Math.max(...messages.map(n => n.id))
      : 0
    return maxId + 1
}

// Lähetetyn viestin aika
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

const PORT = 3001
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})