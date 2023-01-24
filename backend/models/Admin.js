import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
    nom:{required:true, type:String},
    prenom:{required:true, type:String},
    email:{required:true, type:String},
    password:{required:true, type:String}
}, {timestamps:true})

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin