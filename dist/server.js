"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __importStar(require("body-parser"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const port = 4001;
app.use(bodyParser.json());
let notes = [];
var checkNotePayload = (req, res, next) => {
    const { title, body } = req.body;
    if (!title && !body)
        return res.status(400).json({ error: 'Title and body are required' });
    if (!title)
        return res.status(400).json({ error: 'Title is required' });
    if (!body)
        return res.status(400).json({ error: 'Body is required' });
    next();
};
app.post('/notes', checkNotePayload, (req, res) => {
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
    if (!note)
        return res.status(404).json({ error: "Note not found" });
    res.json(note);
});
app.put('/notes/:id', checkNotePayload, (req, res) => {
    const id = parseInt(req.params.id);
    const { title, body } = req.body;
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1)
        return res.status(404).json({ error: "Note not found" });
    notes[index] = { id, title, body };
    res.json(notes[index]);
});
app.delete('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1)
        return res.status(404).json({ error: "Note not found" });
    notes.splice(index, 1)[0];
    res.status(200).json();
});
httpServer.listen(port, () => {
    console.log("Server is listening on port 4001");
});
