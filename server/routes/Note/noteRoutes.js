const express = require('express');
const { createNote, getNotes, updateNote ,getNoteById,deleteNote} = require('../../controller/Note/noteController');

const router = express.Router();

router.post('/notes', createNote);
router.get('/notes/:UserId', getNotes);
router.put('/notes/:id', updateNote); // Add this route for updating notes


// router.get('/notes/:noteId/:UserId', getNoteById); 
router.get('/notessingle/:noteId', getNoteById); 
router.delete('/notes/:noteId', deleteNote); // Delete a note


module.exports = router;
