import express from "express";
const app = express();

import { createServer } from "http";
const httpServer = createServer(app);

import { Server } from "socket.io";
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (client) => {
    client.emit("connection", "Bonjour et bienvenue");
    console.log("User Connect");
    client.on("message", (data) => {
        io.emit("message", data);
        console.log(data);
    });
});

httpServer.listen(5000, () => {
    console.log("Server Launch on 5000");
});
