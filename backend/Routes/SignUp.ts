import express, { Request, Response } from "express";
import User from "../Models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/AuthUtils";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });
    if (existingUser && existingEmail) {
      return res.status(409).json({
        usernameError: "Username is been taken",
        emailError: "Email has been taken",
      });
    } else if (existingUser) {
      return res.status(409).json({ usernameError: "Username is been taken" });
    } else if (existingEmail) {
      return res.status(409).json({
        emailError: "Email has been taken",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password: hashedPassword,
        name,
        email,
      });
      await user.save();
      const token = generateToken({ id: user._id as string, username: user.username });
      return res.status(201).json({ message: "Username and email available", token: token});
    }
  } catch (error: any) {
    return res.status(500).json({ message: "Unexpected error" });
  }
});

export default router;
