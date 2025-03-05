import { Note } from "../models/note_model.js";


// export const getNotes = (req, res) => {
//   res.send('Note added!');
//   res.status(200).json({"notes": "all notes"})
// } 
export const getNotes = async(req, res) => {
  const note = new Note(req.body)
  const newNote = await Note.find({})
 
  res.status(200).json({"notes": allNotes})
 }

export const getNote = async(req, res) => {
  // console.log(req.body)
  // console.log(req)
 const newNote = await Note.findById(req.params.id);

  res.status(200).json({"notes": newNote})
} 

export const postNotes = async(req, res) => {
  // console.log(req.body)
  // console.log(req)
 const note = new Note(req.body)
 const newNote = await note.save();

  res.status(200).json({"notes": newNote})
} 




 



