/* ----------Packages----------- */
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

/* ----------Routes----------- */
import postRoutes from './routes/posts.js'

const app = express();

/* ----------Middleware----------- */
app.use('/posts', postRoutes)

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());


/* ----------Connecting to MongoDB----------- */
const CONNECTION_URL = 'mongodb+srv://tch4lla:kth18822@cluster0.zpuddmt.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))
