const mongoose = require("mongoose");

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
            now.setUTCHours(now.getUTCHours());
            return now;
        },
    },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
