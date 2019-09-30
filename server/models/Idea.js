const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Idea = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    authorId: { type: String, required: true },
    category: { type: String, enum: ['handel', 'rozrywka', 'edukacja', 'sport', 'transport i łączność', 'kulinaria', 'kultura', 'doradztwo', 'finanse', 'inne' ], required: true },
    starsUserIds: Array,
    creationDate: String,
    lastUpdateDate: String,
});

module.exports = mongoose.model('Idea', Idea);
