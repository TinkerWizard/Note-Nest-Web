import dotenv from 'dotenv';
import mongoose from 'mongoose';
import notesRouter from './Routes/Notes';
import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './Routes/Users';
import signInRouter from './Routes/SignIn';
import signUpRouter from './Routes/SignUp';
dotenv.config();


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

app.get('/', (req: Request, res: Response) => {
  res.send("You Are El Rata Alada");
})
//Use the auth routes
app.use('/signin', signInRouter);

app.use('/signup', signUpRouter);

// Use the notes routes
app.use('/notes', notesRouter);
 
//Use the users routes
app.use('/users', userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
