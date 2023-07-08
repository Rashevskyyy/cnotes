const Note = require('../models/noteModel');
const jwt = require("jsonwebtoken");


async function createNote(req, res) {
    const { tag, title, description, isPublished } = req.body;
    console.log('req.headers', req.headers)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }
    const decodedToken = jwt.verify(token, "creative-notes-key");
    console.log('decodedToken', decodedToken)
    const userId = decodedToken.userId
    const firstName = decodedToken.firstName;
    const lastName = decodedToken.lastName;

    const newNote = new Note({
        tag,
        title,
        description,
        userId,
        isPublished,
        firstName,
        lastName,
    });

    newNote
        .save()
        .then(() => {
            res.status(201).json({ message: "Заметка успешно создана" });
        })
        .catch((err) => {
            console.error("Ошибка при создании заметки:", err);
            res.status(500).json({ error: "Произошла ошибка сервера" });
        });
}

module.exports = {
    createNote,
};
