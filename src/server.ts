import * as bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from "express";
import { createServer } from 'http';

const app = express();
const httpServer = createServer(app);
const port = 4001;

app.use(bodyParser.json());

let notes: { id: number; title: string; body: string }[] = [];

var checkNotePayload = (req: Request, res: Response, next: NextFunction) => {
  const { title, body } = req.body;

  if (!title && !body) return res.status(400).json({ error: 'Title and body are required' });
  if (!title) return res.status(400).json({ error: 'Title is required' });
  if (!body) return res.status(400).json({ error: 'Body is required' });

  next();
};

app.post('/notes', checkNotePayload, (req: Request, res: Response) => {
  const { title, body } = req.body;
  const id = notes.length + 1;
  const newNote = { id, title, body };

  notes.push(newNote);

  res.status(201).json(newNote);
});

app.get('/notes', (req: Request, res: Response) => {
  res.json(notes);
});

app.get('/notes/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const note = notes.find((n) => n.id === id);

  if (!note) return res.status(404).json({ error: "Note not found" });

  res.json(note);
});

app.put('/notes/:id', checkNotePayload, (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, body } = req.body;
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) return res.status(404).json({ error: "Note not found" });

  notes[index] = { id, title, body };

  res.json(notes[index]);
});

app.delete('/notes/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === id);

  if (index === -1) return res.status(404).json({ error: "Note not found" });

  notes.splice(index, 1)[0];

  res.status(200).json();
});

httpServer.listen(port, () => {
  console.log("Server is listening on port 4001");
});
