const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  _id: String,
  data: {
    type: Object, // to store Quill Delta format
    required: true,
    default: { ops: [{ insert: 'Start writing your document here...\n' }] }
  }
});

module.exports = mongoose.model('Document', DocumentSchema);

