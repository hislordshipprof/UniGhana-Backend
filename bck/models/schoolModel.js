const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  history: {
    type: String,
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
  ],
  colleges: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
    },
  ],
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;
