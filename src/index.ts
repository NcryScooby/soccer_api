import path from "node:path";
import http from "node:http";
import { router } from "./router";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const PORT = process.env.PORT || 3001;

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(router);
