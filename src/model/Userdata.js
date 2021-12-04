const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.8c9vj.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{
    useNewUrLParser:true,
    useUnifiedTopoLogy:true
});
const Schema=mongoose.Schema;
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{ 
        type:String,
        required:true
       
    },    
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    role: { type: String, default: 'user' }
});
var Userdata=mongoose.model('userdata',UserSchema);
module.exports=Userdata;