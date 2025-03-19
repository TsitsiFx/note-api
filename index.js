
import express from "express";
import notesRouter from "./routes/note_route.js";
import "dotenv/config";
import mongoose from "mongoose";

const connectString = process.env.MONGO_URL;

mongoose.connect(connectString).then(() => {
  console.log('database connected')
}).catch((err) => {
  console.log(err)
})

const app = express();
const port = 5950;

app.use(express.json())
app.use("/api/v1", notesRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
