import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  postId: {
    required: true, 
    type: mongoose.Schema.Types.ObjectId
  },
  message: {
    required: true, 
    type: String
  },
  userId: {
    required: true, 
    type: mongoose.Schema.Types.ObjectId
  }
}, {timestamps: true})

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment