import Charitie from '../models/Charitie.js'
import User from '../models/User.js'

const create = async ( req, res, next) => {
  try { 
    const { titre, description, adresse, phoneNumber, email, userId } = req.body;
    const charitie = new Charitie({
      titre: titre,
      description: description,
      adresse:adresse,
      phoneNumber: phoneNumber,
      email:email,
      userId: userId
    })
    await charitie.save((err, doc) => {
      if(err) throw err
      res.json({
        success: true,
        message: "Les données enregistrées avec succès"
      });
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }   
}

const findAll = async ( req, res, next) => {
  try { 
    const charities = await Charitie.aggregate([{
      $lookup: {
        from:User.collection.name,
        localField: 'userId',
        foreignField:'_id',
        as:'user'
      }
    }]).sort({createdAt:-1}).exec()
    res.json({
      success:true,
      charities: charities
    })
  } catch (error) {
    res.json({  
      success:false,          
      message:error
    });
  }   
}

const findMine = async ( req, res, next ) => {
  try {
    const id = req.params.id;
    const charities = await Charitie.find({userId: id}).sort({createdAt:-1}) 
    res.json({
      success:true,
      charities: charities
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
    const { titre, description, adresse, phoneNumber, email, userId } = req.body;
    await Charitie.findByIdAndUpdate(
      {_id: id},
      {
        $set: {
            titre: titre,
            description: description,
            adresse:adresse,
            phoneNumber: phoneNumber,
            email:email,
            userId: userId
        }
      },
      {new: true}
    ).then((docs) => {
      if(docs) {
        res.json({
          success:true,
          message: "Les données modifiées avec succès",
          post:docs
        })
     } else {
      res.json({
        success:false,
        message: "Aucun données existe avec cette Id",
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
    await Charitie.deleteOne({_id: id}).then(
        res.json({
            success: true,
            message: "Votre données a été supprimer "
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
  findAll,
  findMine,
  update,
  remove
}