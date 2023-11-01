const express = require("express");
const router = express.Router();
const {
    createNote,
    getNotesByUser,
    getPublishedNotes,
    deleteNote,
    getNote,
    addComment,
    deleteComment,
    updateNote
} = require('../controllers/noteController');

router.post("/note", createNote);
router.get("/notes", getNotesByUser);
router.get("/note/:id", getNote);
router.put('/note/:id', updateNote);
router.get("/notes/all", getPublishedNotes);
router.delete("/note/:id", deleteNote);
router.post('/note/:noteId/comments', addComment);
router.delete('/notes/:noteId/comments/:commentId', deleteComment);

module.exports = router;
