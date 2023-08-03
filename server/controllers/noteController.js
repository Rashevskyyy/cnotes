const Note = require('../models/noteModel');
const jwt = require("jsonwebtoken");


async function createNote(req, res) {
    const { tag, title, description, isPublished } = req.body;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }
    const decodedToken = jwt.verify(token, "creative-notes-key");

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

async function getNotesByUser(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }

    const decodedToken = jwt.verify(token, "creative-notes-key");
    const userId = decodedToken.userId;

    try {
        const notes = await Note.find({ userId });
        res.status(200).json(notes);
    } catch (err) {
        console.error("Ошибка при получении заметок:", err);
        res.status(500).json({ error: "Произошла ошибка сервера" });
    }
}

async function getPublishedNotes(req, res) {
    try {
        const notes = await Note.find({ isPublished: true });
        res.status(200).json(notes);
    } catch (err) {
        console.error("Ошибка при получении заметок:", err);
        res.status(500).json({ error: "Произошла ошибка сервера" });
    }
}

async function deleteNote(req, res) {
    const { id: noteId } = req.params;

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Токен отсутствует' });
    }

    try {
        const decodedToken = jwt.verify(token, 'creative-notes-key');
        const userId = decodedToken.userId;

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: 'Заметка не найдена' });
        }

        await Note.deleteOne({ _id: noteId, userId });
        res.status(200).json({ message: 'Заметка успешно удалена' });
    } catch (err) {
        console.error('Ошибка при удалении заметки:', err);
        res.status(500).json({ error: 'Произошла ошибка сервера' });
    }
}

async function getNote(req, res) {
    const { id: noteId } = req.params;

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Токен отсутствует' });
    }

    try {
        const decodedToken = jwt.verify(token, 'creative-notes-key');
        const userId = decodedToken.userId;

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: 'Заметка не найдена' });
        }

        res.status(200).json(note);
    } catch (err) {
        console.error('Ошибка при получении заметки:', err);
        res.status(500).json({ error: 'Произошла ошибка сервера' });
    }
}

async function addComment(req, res) {
    const { noteId } = req.params;
    const { text } = req.body;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }

    const decodedToken = jwt.verify(token, "creative-notes-key");
    const userId = decodedToken.userId;
    const firstName = decodedToken.firstName;
    const lastName = decodedToken.lastName;

    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: "Заметка не найдена" });
        }

        note.comments.push({
            userId,
            firstName,
            lastName,
            text,
        });

        await note.save();
        res.status(201).json({ message: "Комментарий успешно добавлен" });
    } catch (err) {
        console.error("Ошибка при добавлении комментария:", err);
        res.status(500).json({ error: "Произошла ошибка сервера" });
    }
}

async function deleteComment(req, res) {
    const { noteId, commentId } = req.params;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }

    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: "Заметка не найдена" });
        }

        const commentIndex = note.comments.findIndex((comment) => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ error: "Комментарий не найден" });
        }

        note.comments.splice(commentIndex, 1);

        await note.save();
        res.status(200).json({ message: "Комментарий успешно удален" });
    } catch (err) {
        console.error("Ошибка при удалении комментария:", err);
        res.status(500).json({ error: "Произошла ошибка сервера" });
    }
}

module.exports = {
    createNote,
    getNotesByUser,
    getPublishedNotes,
    deleteNote,
    getNote,
    addComment,
    deleteComment
};
