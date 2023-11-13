const Note = require('../models/noteModel');
const jwt = require("jsonwebtoken");
const {User} = require('../models/userModel')

async function createNote(req, res) {
    const { tag, title, description, isPublished } = req.body;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }
    const decodedToken = jwt.verify(token, "creative-notes-key");
    const userId = decodedToken.userId;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    const newNote = new Note({
        tag,
        title,
        description,
        userId,
        isPublished,
        firstName: user.firstName,
        lastName: user.lastName,
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
    const { title, tag } = req.query;

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }

    let userId;
    try {
        const decodedToken = jwt.verify(token, "creative-notes-key");
        userId = decodedToken.userId;
    } catch (err) {
        return res.status(401).json({ error: "Неверный токен" });
    }

    let query = { userId };
    if (title) {
        query.title = new RegExp(title, 'i');
    }
    if (tag) {
        query.tag = { $all: tag.split(",") };
    }

    try {
        const notes = await Note.find(query);
        res.status(200).json(notes);
    } catch (err) {
        console.error("Ошибка при получении заметок:", err);
        res.status(500).json({ error: "Произошла ошибка сервера" });
    }
}

async function getPublishedNotes(req, res) {
    const { title, tag } = req.query;

    let query = { isPublished: true };
    if (title) {
        query.title = new RegExp(title, 'i');
    }
    if (tag) {
        query.tag = { $all: tag.split(",") };
    }

    try {
        const notes = await Note.find(query);
        res.status(200).json(notes);
    } catch (err) {
        console.error("Ошибка при получении опубликованных заметок:", err);
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
        jwt.verify(token, 'creative-notes-key');

        const note = await Note.findOne({ _id: noteId });

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

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: "Пользователь не найден" });
    }

    try {
        const note = await Note.findById(noteId);
        if (!note) {
            return res.status(404).json({ error: "Заметка не найдена" });
        }

        const comment = {
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            text,
            date: new Date().toISOString()
        };

        note.comments.push(comment);

        await note.save();
        res.status(201).json(comment);
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

async function updateNote(req, res) {
    const { id: noteId } = req.params;
    const { title, tag, description } = req.body;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }

    try {
        const decodedToken = jwt.verify(token, "creative-notes-key");
        const userId = decodedToken.userId;

        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            return res.status(404).json({ error: "Заметка не найдена" });
        }

        if (title !== undefined) {
            note.title = title;
        }
        if (tag !== undefined) {
            note.tag = tag;
        }
        if (description !== undefined) {
            note.description = description;
        }

        await note.save();
        res.status(200).json({ message: "Заметка успешно обновлена", note });
    } catch (err) {
        console.error("Ошибка при обновлении заметки:", err);
        res.status(500).json({ error: "Произошла ошибка сервера" });
    }
}

async function toggleLike(req, res) {
    const { noteId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Токен отсутствует" });
    }

    const decodedToken = jwt.verify(token, "creative-notes-key");
    const userId = decodedToken.userId;

    const note = await Note.findById(noteId);
    if (!note) {
        return res.status(404).json({ error: "Заметка не найдена" });
    }

    const userHasLiked = note.likes.includes(userId);

    if (userHasLiked) {
        note.likes.pull(userId);
    } else {
        note.likes.push(userId);
    }

    await note.save();

    res.status(200).json({ likesCount: note.likes.length });
}

module.exports = {
    createNote,
    getNotesByUser,
    getPublishedNotes,
    deleteNote,
    getNote,
    addComment,
    deleteComment,
    updateNote,
    toggleLike
};
