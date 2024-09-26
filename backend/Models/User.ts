import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the User model
interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

// Create the User schema
const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create and export the User model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
