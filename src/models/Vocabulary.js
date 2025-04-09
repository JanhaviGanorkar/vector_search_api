const mongoose = require('mongoose');

const vocabularySchema = new mongoose.Schema({
  terms: {
    type: [String],
    default: []
  },
  documentFrequencies: {
    type: Map,
    of: Number,
    default: new Map()
  },
  totalDocs: {
    type: Number,
    default: 0
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Vocabulary', vocabularySchema);
