const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@fsdfiles.8c9vj.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{
    useNewUrLParser:true,
    useUnifiedTopoLogy:true
});
//mongoose.connect('mongodb://localhost:27017/bookdatas');
const Schema=mongoose.Schema;
const BookSchema=new Schema({
    title:{
        type:String,
        required:true
        
    },
    author:{
        type:String,
        required:true
        
    },
    genre:{
        type:String,
        required:true
        
    },
    imageUrl:{
        type:String,
       
        
    }
});
var Bookdata=mongoose.model('bookdata',BookSchema);
module.exports=Bookdata;