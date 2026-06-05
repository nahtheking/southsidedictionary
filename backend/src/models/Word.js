const mongoose = require('mongoose');

const definitionSchema = new mongoose.Schema({
  definition: String,
  example: String,
  synonyms: [String],
  antonyms: [String]
});

const meaningSchema = new mongoose.Schema({
  partOfSpeech: String,
  definitions: [definitionSchema]
});

const phoneticSchema = new mongoose.Schema({
  text: String,
  audio: String
});

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  phonetics: [phoneticSchema],
  meanings: [meaningSchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Word', wordSchema); 