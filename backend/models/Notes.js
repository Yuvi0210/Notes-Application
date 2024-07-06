const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "general" },
    date: { type: Date, default: Date.now },
    color: { type: String, default: "#000000" }
});

module.exports = mongoose.model('notes', NotesSchema);




