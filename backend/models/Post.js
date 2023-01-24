import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  titre: {
    required: true, 
    type: String
  },
  description: {
    required: true, 
    type: String
  },
  userId: {
    required: true, 
    type: mongoose.Schema.Types.ObjectId
  },
  accuracy:{
    type:String,
    required: true
  }, 
  altitude:{
    type:String,
    required: true
  }, 
  heading:{
    type:String,
    required: true
  }, 
  latitude:{
    type:String,
    required: true
  }, 
  longitude:{
    type:String,
    required: true
  }, 
  speed:{
    type:String,
    required: true
  }
}, {timestamps: true})

const Post = mongoose.model('Post', PostSchema)

export default Post