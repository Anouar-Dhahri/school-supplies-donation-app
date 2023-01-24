import Comment  from '../models/Comment.js';

const create = async ( req, res, next) => {
  try { 
    const { postId, message, userId } = req.body;
    const comment = new Comment({
      postId: postId,
      message: message,
      userId: userId
    })
    await comment.save((err, doc) => {
      if(err) throw err
      res.json({
        success: true,
        message: "Votre commentaire a été ajouté avec succès"
      });
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }   
}

const update = async ( req, res, next ) => {
  try {
    const id = req.params.id;
    await Comment.findByIdAndUpdate(
      {_id: id},
      {
        $set: {
          message: req.body.message
        }
      },
      {new: true}
    ).then((docs) => {
      if(docs) {
        res.json({
          success:true,
          message: "Votre commentaire a été modifié avec succès",
          comment:docs
        })
     } else {
      res.json({
        success:false,
        message: "Aucun commentaire existe avec cette Id",
      })
     }
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Comment.deleteOne({_id: id}).then(
      res.json({
        success: true,
        message: "Votre commentaire a été supprimer "
      })
    )
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}
export {
  create,
  update,
  remove
}