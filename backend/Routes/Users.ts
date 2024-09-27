import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import { authenticateJWT } from "../Middleware/AuthMiddleware";

const router = express.Router();
interface User {
  name: string;
  username: string;
  email: string;
  password: string; // Add 'string' type to password
}

// Get all users
router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users); // Send users as JSON response
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: err.message });
  }
});

router.get(
  "/profile/:username",
  authenticateJWT,
  async (req: Request, res: Response) => {
    try {
      const { username } = req.params;

      // Use findOne to get a single user document
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      // Send user details in the response
      res
        .status(200)
        .json({ username: user.username, name: user.name, email: user.email });
    } catch (error: any) {
      res.status(400).json({ message: `Unexpected error: ${error.message}` });
    }
  }
);

router.put("/password", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const userExist = await User.updateOne(
      { username: username }, // Query to find the user
      { $set: { password: hashedPassword } } // Set the new hashed password
    );
    if (userExist.modifiedCount > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" });
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found or password not updated",
      });
    }
  } catch (error: any) {
    console.error("Error updating password:", error.message);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
    });
  }
});
export default router;
