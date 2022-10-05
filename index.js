const { urlencoded } = require('body-parser');
const multer=require('multer');
const testFolder ='./public/uploads';
const fs=require('fs')
const express=require('express');
const mongoose=require('mongoose');
const path=require('path');
const app=express();
const session=require('express-session')
const appAddNewUser=require('./routes/apply')
const loginUser=require('./routes/login')
const adminControl=require('./routes/admin');
app.use(express.urlencoded({extended:true}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost:27017/DKZ',{ useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>{
    console.log('MongoDBga ulandi...')
})
.catch((err)=>{
    console.log('MongoDbga ulanishda xaatolik ro\'y berdi!',err)
})
const port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`${port}chi portni eshitish boshladim...`)
})
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(express.json())
app.use(session({
    secret:"Bum@n!n#sh^fr4lar1m",
    resave:false,
    saveUninitialized:false
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(urlencoded({extended:false}))
app.use('/',require('./routes/change'))
app.use('/apply',appAddNewUser);
app.use('/login',loginUser);
app.use('/',adminControl);