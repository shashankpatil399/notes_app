const express = require('express');
const Note = require('../models/Note');
const router = express.Router();

// Create a new note
router.post('/', async (req, res) => {
    try {
        const note = new Note({
            content: req.body.content,
        });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a note
router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        res.json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
