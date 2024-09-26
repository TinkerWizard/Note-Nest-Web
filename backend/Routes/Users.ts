import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../Models/User';
import { authenticateJWT } from '../Middleware/AuthMiddleware';


const router = express.Router();
interface User {
  name: string;
  username: string;
  email: string;
  password: string; // Add 'string' type to password
}

// Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);                // Send users as JSON response
  } catch (err: any) {
    res.status(500).json({ message: 'Error retrieving users', error: err.message });
  }
});


router.get('/profile/:username', authenticateJWT,  async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    // Use findOne to get a single user document
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Send user details in the response
    res.status(200).json({ username: user.username, name: user.name, email: user.email });
  } catch (error: any) {
    res.status(400).json({ message: `Unexpected error: ${error.message}` });
  }
});


export default router;
