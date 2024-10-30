import express from 'express';
import { Server } from "socket.io";
import { createServer } from "http"
import { Room } from "./Room.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const HOST = process.env.HOST

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cleanupEmptyChildNamespaces: true,
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  console.log("Conectado ao servidor geral")
});

io.of(/^\/dynamic-\d+$/).on("connection", (socket) => {
  const namespace = socket.nsp.name;
  console.log("Conectado ao namespace", namespace)
  const room = new Room()
});

httpServer.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`);
});