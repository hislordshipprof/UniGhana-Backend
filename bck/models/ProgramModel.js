const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  title: {
    type: String,
  },
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program;
