import mongoose from 'mongoose';

const CharitieSchema = new mongoose.Schema({
    titre:{required:true, type:String},
    description:{required:true, type:String},
    adresse:{required:true, type:String},
    phoneNumber: {required:true, type:Number},
    email:{required:true, type:String},
    userId:{
        required: true, 
        type: mongoose.Schema.Types.ObjectId
    }
}, {timestamps:true})

const Charitie = mongoose.model('Charitie', CharitieSchema);

export default Charitie