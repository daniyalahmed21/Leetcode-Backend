import express from 'express';
import Redis from 'ioredis';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
app.use(express.json());
const httpServer = createServer(app);

const redisCache = new Redis(); 

const io = new Server(httpServer, { 
    cors: {
        origin: "http://localhost:5500",
        methods: ["GET", "POST"]
    }
 }); 

io.on("connection", (socket) => {
    console.log("A user connected " + socket.id);
    socket.on("setUserId", (userId) => {
        redisCache.set(userId, socket.id);
    });

    socket.on('getConnectionId', async (userId) => {
        const connId = await redisCache.get(userId);
        socket.emit('connectionId', connId);
    })

});

app.post('/sendPayload', async (req, res) => {
    console.log(req.body);
    const { userId, response } = req.body;
   if(!userId || !response) {
       return res.status(400).send("Invalid request");
   }
   const socketId = await redisCache.get(userId);

   if(socketId) {
         io.to(socketId).emit('submissionPayloadResponse', response);
         return res.send("Payload sent successfully");
    } else {
        return res.status(404).send("User not connected");
    
   }

})

httpServer.listen(3005, () => {
    console.log("Server is running on port 3005");
});