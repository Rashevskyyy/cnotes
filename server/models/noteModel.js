const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    tag: String,
    title: String,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Ссылка на модель пользователя
    },
    userName: String,
    firstName: String,
    lastName: String,
    isPublished: {
        type: Boolean,
        default: false,
    },
    date: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setUTCHours(now.getUTCHours() + 3); // Добавляем смещение +3 часа к текущему UTC времени
            return now;
        },
    },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
