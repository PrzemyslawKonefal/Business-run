const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: { type: String, required: true },
    postId: { type: String, required: true },
    authorId: { type: String, required: true },
    responseId: { type: String },
    creationDate: { type: String, required: true },
    lastUpdateDate: { type: String, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
