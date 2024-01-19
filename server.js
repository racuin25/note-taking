"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import required modules
const express_1 = require("express");
const body_parser_1 = require("body-parser");
// Create an Express application
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware for parsing JSON data
app.use(body_parser_1.default.json());
// In-memory array to store notes
let notes = [];
// Middleware for data validation
const validateNote = (req, res, next) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({ error: 'Title and body are required for a note.' });
    }
    next();
};
// API Endpoints
app.post('/notes', validateNote, (req, res) => {
    const { title, body } = req.body;
    const id = notes.length + 1;
    const newNote = { id, title, body };
    notes.push(newNote);
    res.status(201).json(newNote);
});
app.get('/notes', (req, res) => {
    res.json(notes);
});
app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find((n) => n.id === id);
    if (!note) {
        return res.status(404).json({ error: 'Note not found.' });
    }
    res.json(note);
});
app.put('/notes/:id', validateNote, (req, res) => {
    const id = parseInt(req.params.id);
    const { title, body } = req.body;
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Note not found.' });
    }
    notes[index] = { id, title, body };
    res.json(notes[index]);
});
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Note not found.' });
    }
    const deletedNote = notes.splice(index, 1)[0];
    res.json(deletedNote);
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
