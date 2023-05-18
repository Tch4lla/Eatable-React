/* ----------Packages----------- */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
/* ----------Routes----------- */
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config()

/* ----------Middleware----------- */
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


/* ----------Connecting to MongoDB----------- */
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))

app.use('/posts', postRoutes)
app.use('/user', userRoutes)

export default app