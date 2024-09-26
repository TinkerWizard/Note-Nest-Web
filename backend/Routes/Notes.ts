import express, { Request, Response } from "express";
import Note from "../Models/Note";
import mongoose from "mongoose";
import { authenticateJWT } from '../Middleware/AuthMiddleware';
import { AuthenticatedRequest } from '../Middleware/type';

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const notes = await Note.find(); // Retrieve all notes
    res.json(notes);
  } catch (err: any) {
    console.error("Error:", err.message);
    res
      .status(500)
      .json({ message: "Error retrieving notes", error: err.message });
  }
});

router.get("/:username", authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { username } = req.params; // Get username from the route parameter

    if (username !== req.user.username) {
      return res.status(403).json({ accessDeniedMessage: "Access denied, you cannot access this URL" });
    }
    const notes = await Note.find({ username }); // Fetch notes from the database

    // Check if notes exist
    if (!notes) {
      return res.status(404).json({ message: "No notes found for this user" });
    }

    res.json(notes); // Send the notes as a response
  } catch (err: any) {
    console.error("Error:", err.message); // Log error for debugging
    res.status(500).json({ message: "Error retrieving notes", error: err.message }); // Send error response
  }
});

router.post("/", authenticateJWT, async (req: Request, res: Response) => {
  const { title, content, username } = req.body;
  console.log(title, content, username);
  Note.insertMany({ title, content, username });
});
export default router;

router.put("/:_id", authenticateJWT, async (req: Request, res: Response) => {
  const { _id } = req.params;
  const { title, content } = req.body;
  const note = await Note.findById({ _id });
  const noteUsername = note?.username;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new Error("Invalid note ID");
    }
    const result = await Note.updateOne(
      { _id: _id },
      { $set: { title: title, content: content } }
    );
    if (result.modifiedCount === 0) {
      console.log("No note was updated. It may not exist.");
      res
        .status(500)
        .json({ updatedMessage: "Note updation failed. Try again" });
    } else {
      console.log("Note updated successfully:", result);
      res
        .status(200)
        .json({
          updatedMessage: "Note updated successfully",
          username: noteUsername,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ updatedMessage: "Error updating the note, Try again" });
  }
});
  
router.delete("/:_id", authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const note = await Note.findById({ _id });
    const noteUsername = note?.username;
    const result = Note.deleteOne({ _id });
    if ((await result).deletedCount === 0) {
      // If no document was deleted, respond with 404
      return res
        .status(404)
        .json({ message: "Note not found or already deleted" });
    }
    res.status(200).json({ message: "Note deleted successfully", username: noteUsername });
  } catch (error) {
    res.status(500).json({ message: "Error occured" });
  }
});

router.get('/:username/search', authenticateJWT, async (req: AuthenticatedRequest, res: Response) => {
  const {username} = req.params;
  const { title } = req.query;
  if (username !== req.user.username) {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    const notes = await Note.find({
      username: username,
      title: { $regex: new RegExp(title as string, "i") } // Case-insensitive search
    });
    // console.log(notes);
    res.status(200).json({notes: notes});
  } catch (err: any) {
    console.error("Error during search:", err.message);
    res
      .status(500)
      .json({ message: "Error searching notes", error: err.message });
  }
});