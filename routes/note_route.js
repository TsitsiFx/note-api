import { Router } from 'express';

import { getNote, getNotes, postNotes } from '../controllers/note_controller.js';
import { registerUser } from '../controllers/user_controller.js';

const notesRouter = Router();


notesRouter.get('/note_route', getNotes);
notesRouter.post('/note_route', postNotes);
notesRouter.get('/note_route/:id', getNote);
notesRouter.post('/register', registerUser)

export default notesRouter;
