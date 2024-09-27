import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import notesRouter from './Routes/Notes';
import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './Routes/Users';
import signInRouter from './Routes/SignIn';
import signUpRouter from './Routes/SignUp';
import resetRouter from './Routes/Reset';


const app = express();
const port = 5000;
const bodyParser = require('body-parser');

// Middleware to parse JSON
app.use(express.json()); 
app.use(cors()); 
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/Note-Nest')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/signin', signInRouter);

app.use('/signup', signUpRouter);

app.use('/reset', resetRouter);
// Use the notes routes
app.use('/notes', notesRouter);
 
//Use the users routes
app.use('/users', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
