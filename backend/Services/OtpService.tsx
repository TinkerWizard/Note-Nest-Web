import Otp from "../Models/OTP";
import User from "../Models/User";
import sgMail from '@sendgrid/mail';

const API_KEY: string = process.env.SENDGRID_MAIL_API_KEY ?? '';

if (!API_KEY) {
  throw new Error('SENDGRID_MAIL_API_KEY environment variable is not defined.');
}

sgMail.setApiKey(API_KEY);

export const generateOtp = async (username: string): Promise<string | null> => {
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in the database
    const otpEntry = new Otp({
      username,
      otp
    });
    await otpEntry.save();

    // Fetch the user's email based on the username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("User not found");
      return null;
    }

    const email = user.email;
    console.log("Sending OTP to:", email);

    // Compose the email message
    const message = {
      to: email,
      from: {
        name: "Tinker Wizard",
        email: "tinker.wizardry@gmail.com",
      },
      subject: "Note Nest Password Reset Request",
      html: `<h1>Dear User, Your OTP is ${otp}</h1>`, // Using HTML body
    };

    // Send the email using SendGrid
    await sgMail.send(message);
    console.log("OTP sent successfully.");

    return otp;
  } catch (error: any) {
    console.error("Error in generating OTP:", error.message);
    return null;
  }
};

export const verifyOtp = async (username: string, inputOtp: string): Promise<{ success: boolean; message: string }> => {
  try {
    // Look for the OTP in the database
    const otpRecord = await Otp.findOne({ username }).sort({ createdAt: -1 });

    // If OTP not found or expired
    if (!otpRecord) {
      return { success: false, message: 'OTP expired or not found' };
    }

    // Verify the OTP
    if (otpRecord.otp === inputOtp) {
      return { success: true, message: 'OTP verified successfully' };
    }

    // Invalid OTP
    return { success: false, message: 'Invalid OTP' };
  } catch (error: any) {
    console.error("Error in verifying OTP:", error.message);
    return { success: false, message: 'Error occurred while verifying OTP' };
  }
};
