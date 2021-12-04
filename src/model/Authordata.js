const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.8c9vj.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{
    useNewUrLParser:true,
    useUnifiedTopoLogy:true
});

const Schema=mongoose.Schema;
const AuthorSchema=new Schema({
    name:{
        type:String,
        required:true
        
    },
    famouswork:{
        type:String,
        required:true
        
    },
    nationality:{
        type:String,
        required:true
        
    },
    imageUrl:{
        type:String
        
        
    }
});
var Authordata=mongoose.model('authordata',AuthorSchema);
module.exports=Authordata;