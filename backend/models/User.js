import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nom:{required:true, type:String},
    prenom:{required:true, type:String},
    phoneNumber: {required:true, type:Number},
    email:{required:true, type:String},
    password:{required:true, type:String}
}, {timestamps:true})

const User = mongoose.model('User', UserSchema);

export default User