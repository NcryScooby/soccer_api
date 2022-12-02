import path from "node:path";
import { router } from "./router";
import express from "express";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3001;

app.use("/uploads", express.static(path.resolve(__dirname, "..", "uploads")));

app.listen(PORT, () => {
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
