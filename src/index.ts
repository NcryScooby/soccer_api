import { router } from "./router";
import express from "express";

const app = express();

app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
