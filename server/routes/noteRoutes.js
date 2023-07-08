const express = require("express");
const router = express.Router();
const {createNote} = require('../controllers/noteController');

router.post("/note", createNote);

module.exports = router;
