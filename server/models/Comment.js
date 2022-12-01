const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    // 댓글 쓰는 게시물 아이디
    post_id: {
      type: String,
      required: true
    },
    // 댓글 쓴 사람
    writer_id: {
      type: String,
      required: true
    },
    // 댓글 쓴 사람 이름
    writer_name: {
      type: String,
      required: true
    },
    // 댓글의 내용
    contents: {
      type: String,
      maxLength: 1000,
    },
    writeDate: {
      type: Date,
      default: Date.now
    }
    // //대댓글 구현 시 부모 댓글 ID
    // responseTo: {
    //   type:  mongoose.Schema.Types.ObjectId,
    //   ref: "Comment",
    // }
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = { Comment };