import express, { Request, Response } from "express";
import User from "../Models/User";
import bcrypt from 'bcryptjs';
import { generateToken } from "../Utils/AuthUtils";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    // const users = await User.find();
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ usernameError: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ passwordError: 'Invalid username or password' });
    }
    const token = generateToken({ id: user._id as string, username: user.username });
    res.status(200).json({ token });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
