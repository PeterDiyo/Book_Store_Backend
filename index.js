import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from "cors";

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY

//option 1: Allow All Origins with default of cors(*)
    app.use(cors());

//option 2: Allow Custom Origins
//app.use(
  //cors({
    //origin: 'http://localhost:5555',
    //methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //allowedHeaders: ['Content-Type'],
  //})
  //);

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to my BStore');
  });

app.use('/books', booksRoutes);


mongoose
   .connect(mongoDBURL)
   .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () =>{
        console.log(`App is listening at port: ${PORT}`);
    });
   })
   .catch((error) => {
    console.log(error);
   });