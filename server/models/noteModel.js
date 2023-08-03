const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: String,
    lastName: String,
    text: String,
    date: {
        type: Date,
        default: () => {
            const now = new Date();
            now.setHours(now.getHours());
            return now;
        },
    },
});

const noteSchema = new mongoose.Schema({
    tag: String,
    title: String,
    description: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
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
            now.setHours(now.getHours());
            return now;
        },
    },
    comments: [commentSchema],
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
