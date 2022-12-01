const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
      club: {
        type: String,
        required: true
      },
      writer: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      noticeToken: {
        type: String
      },
      writeDate: {
        type: Date,
        default: Date.now
      },
      count : {
        type: Number,
        default: 0
      }
});

const Notice = mongoose.model('Notice', NoticeSchema);
module.exports = { Notice } //다른 file에서도 사용할 수 있도록