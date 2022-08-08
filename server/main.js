const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
   cors: {
      origin: 'http://127.0.0.1:5500',
   },
})
const cors = require('cors')
app.use(cors())

const msgCache = []

io.on('connection', socket => {
   console.log('A user connected')

   socket.on('disconnect', () => {
      console.log('A user disconnected')
   })

   socket.on('chat message', msg => {
      console.log('New message:', msg)
      msgCache.push({
         createdAt: new Date(),
         message: msg.message,
         user: msg.user,
      })
      io.emit('new message', {
         createdAt: new Date(),
         message: msg.message,
         user: msg.user,
      })
   })
})

server.listen(3000, () => {
   console.log('Listening on *:3000')
})
