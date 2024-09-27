import express, { Request, Response } from "express";
import User from "../Models/User";
import Otp from "../Models/OTP";
import { generateOtp, verifyOtp } from "../Services/OtpService";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const userExist = await User.findOne({ username: username });

    if (userExist) {
      // Check if the user was found
      console.log(userExist.email);
      //generate and OTP and store in the db and set an expiry time. Verify and send the mail using sendgrid
      generateOtp(userExist.username);
      return res.status(200).json({ message: "User found and otp sent" });
    } else {
      console.log("User not found");
      return res
        .status(404)
        .json({ error: "Username or Email does not exist" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
});

router.post("/verify", async (req: Request, res: Response) => {
  try {
    const { username, OTP } = req.body; // Use req.body instead of req.params

    // Await the verifyOtp function only once
    const response = await verifyOtp(username, OTP);

    if (response.success) {
      return res.status(200).json({ message: response.message });
    } else {
      return res.status(400).json({ message: response.message });
    }
  } catch (error: any) {
    console.error("Error in /verify route:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
