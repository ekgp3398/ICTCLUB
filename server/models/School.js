const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema({
      writer: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      link: {
        type: String,
        required: true
      },
      major: {
        type: String,
        required: true
      },
      date: {
        type: Number,
        required: true
      }
});

const School = mongoose.model('School', SchoolSchema);
module.exports = { School } //다른 file에서도 사용할 수 있도록