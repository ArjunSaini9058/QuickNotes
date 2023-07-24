import express from 'express'
import { getNotes,createNote,deleteNote,updateNote, getNotesId } from '../controllers/noteControllers.js';
const noteRouter = express.Router();
import auth from '../middleware/auth.js';
noteRouter.get("/", auth, getNotes);
noteRouter.get("/:id", auth, getNotesId);
noteRouter.post("/", auth, createNote);

noteRouter.delete("/:id", auth, deleteNote);

noteRouter.put("/:id", auth, updateNote);

export default noteRouter