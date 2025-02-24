

const Note = require('../../model/Note/Note');

// Save a new note
const createNote = async (req, res) => {
    const { title, date, content, UserId } = req.body;
    try {

        console.log(UserId)
        const newNote = new Note({ title, date, content, UserId });
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save note' });
    }
};

// // Get all notes
// const getNotes = async (req, res) => {
//     const { UserId } = req.params;

//     console.log(UserId)
//     try {
//         const notes = await Note.find();
//         res.json(notes);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch notes' });
//     }
// };

// Get all notes for a specific UserId
const getNotes = async (req, res) => {
    const { UserId } = req.params;

    try {
        const notes = await Note.find({ UserId }); // Fetch notes matching the UserId
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notes' });
    }
};




// Get a specific note by ID
const getNoteById = async (req, res) => {
    // const { noteId, UserId } = req.params;
    const { noteId } = req.params;

    try {
        const note = await Note.findOne({ _id: noteId });
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch note', error });
    }
};



// Update an existing note by ID
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, date, content, UserId } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, date, content, UserId },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update note' });
    }
};


// Delete a note
const deleteNote = async (req, res) => {
    const { noteId } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error });
    }
};

module.exports = { createNote, getNotes, updateNote ,deleteNote,getNoteById};



// const Note = require('../../model/Note/Note');

// // Save a new note
// const createNote = async (req, res) => {
//     const { title, date, content } = req.body;
//     try {
//         const newNote = new Note({ title, date, content });
//         await newNote.save();
//         res.json(newNote);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to save note' });
//     }
// };

// // Get all notes
// const getNotes = async (req, res) => {
//     try {
//         const notes = await Note.find();
//         res.json(notes);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to fetch notes' });
//     }
// };

// // Update an existing note by ID
// const updateNote = async (req, res) => {
//     const { id } = req.params;
//     const { title, date, content } = req.body;
//     try {
//         const updatedNote = await Note.findByIdAndUpdate(
//             id,
//             { title, date, content },
//             { new: true }
//         );
//         if (!updatedNote) {
//             return res.status(404).json({ error: 'Note not found' });
//         }
//         res.json(updatedNote);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to update note' });
//     }
// };

// module.exports = { createNote, getNotes, updateNote };
