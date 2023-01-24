import Article from './../models/Article.js'
import Post from '../models/Post.js'
import Comment  from '../models/Comment.js';

const Dashboard = async (req, res, next) => {
  try {
    const id = req.params.id;
    const articles = await Article.find({userId:id}).count();
    const posts = await Post.find({userId: id}).count()
    const comments = await Comment.find({userId: id}).count()
    res.json({
      success:true,
      articles: articles,
      posts: posts,
      comments: comments
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

export { Dashboard }