const express = require('express');
const Bookdata = require('./src/model/Bookdata');
const Authordata = require('./src/model/Authordata');
const Userdata = require('./src/model/Userdata');
const methodoverride = require('method-override');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
var app = new express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({ secret: 'ssshhhhh', resave: true, saveUninitialized: true }));

app.use(session({      //session creation
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
const path = require('path');
app.use(express.static('./dist/frontend'));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist//frontend/index.html'));
 });
 


function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}
   
app.post('/api/signup', function (req, res) {
  res.header("Acess-Control-Allow-Orgin","*")
  res.header('Acess-Control-Allow-Methods: GET, POST, PATCH, PUT,')
  const User = req.body.user;
  console.log(User);
  var usr=Userdata(User);  
  usr.save()

  
  }) 


app.post('/api/login', (req, res) => {
 
  let username = req.body.username;
  let password = req.body.password;

  // mongo check for user
  if (username === 'admin' && password === '1234') {
      req.session.role = 'admin';
      console.log("admin login success")
      let payload = {subject: username+password,role: req.session.role }
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token,role:req.session.role})

  }
  else if (((username === "") && (password === "")) ) {
    res.status(401).send('Invalid ')  
  }  
   else {
      Userdata.findOne({ username: username, password: password },function (err, user) {
          if (err) {
            res.status(401).send('Invalid ') 
            res.send({ status: false });

          }
          else if (user) {
              console.log("user data", user)
              req.session.role = 'user';
              let payload = {subject: username+password,role: req.session.role }
                      let token = jwt.sign(payload, 'secretKey')
                      res.status(200).send({token,role: req.session.role })
                   
          } else {
            res.status(401).send('Invalid ') 
            res.send({ status: false });
          }

      });
  }
});



      
 
     
   


app.get('/api/books',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    
    Bookdata.find()
                .then(function(books){
                    res.send(books);
                });
});


app.post('/api/addbook',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    
   
    var book = {       
        title : req.body.book.title,
        author : req.body.book.author,
        genre : req.body.book.genre,
        imageUrl : req.body.book.imageUrl,
   }       
   var book = new Bookdata(book);
   book.save();
});

  app.put('/api/book/update',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
//     var updatedData={
//       title:req.body.title,
//       author:req.body.author,
//       genre:req.body.genre,
//       imageUrl:req.body.imageUrl,
//   }
// Bookdata.findByIdAndUpdate({_id: req.params.id},{$set: updatedData}
      console.log(req.body)
       id=req.body._id,
        title =req.body.title,
        author =req.body.author,
        genre = req.body.genre,
        imageUrl =req.body.imageUrl,
       
     Bookdata.findByIdAndUpdate({"_id":id},
                                  {$set:{"title":title,
                                  "author":author,
                                  "genre":genre,
                                  "imageUrl":imageUrl}})
     .then(function(){
      console.log('success')
         res.send();
     })

   })
   app.delete('/api/book/remove/:id',(req,res)=>{
   
    // id = req.params.id;
    book =  Bookdata.findById(req.params.id)
     book.remove()   
    // Bookdata.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  }) 
  
  app.get('/api/authors',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    
    Authordata.find()
                .then(function(authors){
                    res.send(authors);
                });
});
 app.post('/api/addauthor',function(req,res){
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
    
   
    var author = {       
        name : req.body.author.name,
        famouswork : req.body.author.famouswork,
        nationality : req.body.author.nationality,
        imageUrl : req.body.author.imageUrl,
   }       
   var author = new Authordata(author);
   author.save();
});
app.get('/api/book/:id',  (req, res) => {
  
  const id = req.params.id;
    Bookdata.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})
app.get('/api/author/:id',  (req, res) => {
  
  const id = req.params.id;
    Authordata.findOne({"_id":id})
    .then((author)=>{
        res.send(author);
    });
})
app.put('/api/author/updates',(req,res)=>{
  res.header("Access-Control-Allow-Origin","*")
  res.header("Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS");
//     var updatedData={
//       title:req.body.title,
//       author:req.body.author,
//       genre:req.body.genre,
//       imageUrl:req.body.imageUrl,
//   }
// Bookdata.findByIdAndUpdate({_id: req.params.id},{$set: updatedData}
    console.log(req.body)
     id=req.body._id,
      name =req.body.name,
      famouswork =req.body.famouswork,
      nationality= req.body.nationality,
      imageUrl =req.body.imageUrl,
     
   Authordata.findByIdAndUpdate({"_id":id},
                                {$set:{"name":name,
                                "famouswork":famouswork,
                                "nationality":nationality,
                                "imageUrl":imageUrl}})
   .then(function(){
    console.log('success')
       res.send();
   })

 })
 app.delete('/api/author/delete/:id',(req,res)=>{
 
  // id = req.params.id;
  author =  Authordata.findById(req.params.id)
   author.remove()   
  // Bookdata.findByIdAndDelete({"_id":id})
  .then(()=>{
      console.log('success')
      res.send();
  })
}) 
app.listen(port,()=>{console.log("Server Ready at" + port)});
