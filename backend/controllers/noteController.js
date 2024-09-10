const Note = require('../models/Note');

// Get all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new note
const createNote = async (req, res) => {
    const note = new Note({
        text: req.body.text,
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await note.remove();
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getNotes, createNote, deleteNote };
