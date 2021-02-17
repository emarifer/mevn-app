import express from 'express';
import Note from '../models/note';
const router = express.Router();

// POST. route through which notes are added
router.post('/new-note', async (req, res) => {
    const body = req.body;

    try {
        const noteDB = await Note.create(body);
        res.status(200).json(noteDB); // El status 200 viene por defecto: no es necesario
    } catch (error) {
        res.status(500).json({
            message: 'Ocurrió un error',
            error
        });
    }
});

// GET. get a note with parameters (id)
router.get('/note/:id', async (req, res) => {
    const _id = req.params.id; // Hay recordar que en MongoDB el id es un parametro precedido por guion bajo ("_")

    try {
        const noteaDB = await Note.findOne({ _id });
        res.json(noteaDB); // No es necesario el status 200
    } catch (error) {
        res.status(400).json({
            message: 'Ocurrió un error',
            error
        });
    }
});

// GET. get all documents or notes
router.get('/notes', async (req, res) => {
    try {
        const notesDB = await Note.find();
        res.json(notesDB);
    } catch (error) {
        res.status(400).json({
            message: 'Ocurrió un error',
            error
        });
    }
});

// DELETE. delete a note with the given id 
router.delete('/note/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const noteDB = await Note.findByIdAndDelete({ _id });
        res.json(noteDB);
    } catch (error) {
        res.status(400).json({
            message: 'Ocurrió un error',
            error
        });
    }
});

// PUT. upadate a note with the given id 
router.put('/note/:id', async (req, res) => {
    const _id = req.params.id;
    const body = req.body;

    try {
        const noteDB = await Note.findByIdAndUpdate(_id, body, { new: true });
        res.json(noteDB);
    } catch (error) {
        res.status(400).json({
            message: 'Ocurrió un error',
            error
        });
    }
});

module.exports = router;