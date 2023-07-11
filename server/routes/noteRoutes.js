const express = require("express");
const router = express.Router();
const {createNote, getNotesByUser, getPublishedNotes, deleteNote, getNote} = require('../controllers/noteController');

router.post("/note", createNote);
router.get("/notes", getNotesByUser);
router.get("/note/:id", getNote);
router.get("/notes/all", getPublishedNotes);
router.delete("/note/:id", deleteNote);

module.exports = router;
