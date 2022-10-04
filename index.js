import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()
app.use(cors({
    origin: '*'
}))
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    socket.on('join_room', (username, room) => {
        socket.join(room)
        console.log('User Joined ', username, room)
    })
    socket.on('send_message', (data) => {
        console.log(data)
        socket.to(data.room).emit('receive_message', data)
    })

})

httpServer.listen(8080, () => {
    console.log('Listening on port 8080')
})