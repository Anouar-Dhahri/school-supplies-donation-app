import Article from '../models/Article.js'
import User from '../models/User.js'

const findAll = async(req, res, next) => {
  try {
    const articles = await Article.aggregate([{
      $lookup: {
        from:User.collection.name,
        localField: 'userId',
        foreignField:'_id',
        as:'user'
      }
    }]).sort({createdAt:-1}).exec()
    res.json({
      success:true,
      articles: articles
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const findMine = async(req, res, next) => {
  try {
    const id = req.params.id;
    const articles = await Article.find({userId:id}).sort({createdAt:-1}) ;
    res.json({
      success:true,
      articles: articles
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const create = async (req, res, next) => {
  try {
    const { userId, titre, description, etat, uri } = req.body
    const { accuracy, altitude, heading, latitude, longitude, speed } = req.body.location.coords
    if(!uri) {
      const article = new Article({
        userId: userId,
        titre: titre,
        description: description,
        etat: etat,
        accuracy:accuracy, 
        altitude:altitude, 
        heading:heading, 
        latitude:latitude, 
        longitude:longitude, 
        speed:speed
      })
      await article.save((err, doc) => {
        if(err){
          res.json({
            success:false,
            message: err,
          });
        }else {
          res.json({
            success: true,
            message: "Votre Article a été ajouté avec succès",
            article: doc
          });
        }
      })
    }else {
      const article = new Article({
        userId: userId,
        titre: titre,
        description: description,
        etat: etat,
        uri:uri
      })
      await article.save((err, doc) => {
        if(err){
          res.json({
            success:false,
            message: err,
          });
        }else {
          res.json({
            success: true,
            message: "Votre Article a été ajouté avec succès",
            article: doc
          });
        }
      })
    }
    /*const article = new Article({
      userId: userId,
      titre: titre,
      description: description,
      etat: etat,
      uri:uri
    })
    await article.save((err, doc) => {
      if(err){
        res.json({
          success:false,
          message: err,
        });
      }else {
        res.json({
          success: true,
          message: "Votre Article a été ajouté avec succès",
          article: doc
        });
      }
    })*/
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { titre, description, etat, uri } = req.body
    const { accuracy, altitude, heading, latitude, longitude, speed } = req.body.location.coords
    console.log(id, titre, description, etat, uri )
    /*if(!uri){
      console.log("URI IS EMPTY")
    }else {
      console.log("URI IS NOT EMPTY")
    }*/
    if(!uri) {
      await Article.findByIdAndUpdate(
        {_id: id},
        {
          $set: {
            titre: titre,
            description: description,
            etat: etat,
            uri: "https://www.thd.tn/wp-content/uploads/2022/08/fourniture-scolaire.jpg",
            accuracy:accuracy, 
            altitude:altitude, 
            heading:heading, 
            latitude:latitude, 
            longitude:longitude, 
            speed:speed
          }
        },{new: true}
      ).then((doc) => {
        if(doc){
          res.json({
            success: true,
            message: "Votre Article a été modifié avec succès",
            article: doc
          });
        }else {
          res.json({
            success:false,
            message: err,
          });
        }
      })
    }else {
      await Article.findByIdAndUpdate(
        {_id: id},
        {
          $set: {
            titre: titre,
            description: description,
            etat: etat,
            uri: uri
          }
        },{new: true}
      ).then((doc) => {
        if(doc){
          res.json({
            success: true,
            message: "Votre Article a été modifié avec succès",
            article: doc
          });
        }else {
          res.json({
            success:false,
            message: err,
          });
        }
      })
    }
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const status = async (req, res, next) => {
  try {
    const id = req.params.id;
    const status = req.body.status;
    await Article.findByIdAndUpdate(
      {_id: id},
      {
        $set: {
          disponible: status
        }
      },
      {new: true}
    ).then((docs) => {
      if(docs) {
        res.json({
          success:true,
          message: "Statut de votre Article a été modifie ",
          user:docs
        })
     } else {
      res.json({
        success:false,
        message: "Aucun Article existe avec cette Id",
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
    await Article.deleteOne({_id: id}).then( 
      res.json({
        success: true,
        message: "Votre Article a été supprimer "
      })
    )
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }
}

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const dm = decimal || 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
};

export {
  findAll,
  findMine,
  create,
  update,
  status,
  remove
}