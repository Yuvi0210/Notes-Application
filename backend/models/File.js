const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "general" },
    img:
    {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('files', FileSchema);
 



