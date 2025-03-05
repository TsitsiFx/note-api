import { Router } from 'express';

import { getNote, getNotes, postNotes } from '../controllers/note_controller.js';

const notesRouter = Router();


notesRouter.get('/note_route', getNotes);
notesRouter.post('/note_route', postNotes);
notesRouter.get('/note_route/:id', getNote)

export default notesRouter;
