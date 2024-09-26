import mongoose, { Schema, Document, Types } from 'mongoose';

// Define an interface for the Note model
interface INote extends Document {
  title: string;
  content: string;
  date: Date;
  username: string;
}

// Create a schema corresponding to the document interface
const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  username : { type: String, required: true }
});

// Create and export the model
const Note = mongoose.model<INote>('Note', NoteSchema);
export default Note;
