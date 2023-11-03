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
    updateNote,
    toggleLike
} = require('../controllers/noteController');

router.post("/note", createNote);
router.get("/notes", getNotesByUser);
router.get("/note/:id", getNote);
router.put('/note/:id', updateNote);
router.get("/notes/all", getPublishedNotes);
router.delete("/note/:id", deleteNote);
router.post('/note/:noteId/comments', addComment);
router.delete('/notes/:noteId/comments/:commentId', deleteComment);
router.post('/notes/:noteId/toggle-like', toggleLike);

module.exports = router;
