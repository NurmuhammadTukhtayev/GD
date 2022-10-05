const express=require('express')
const router=express.Router();
const {User}=require('../Schemas/userschema')
const {Videos}=require('../Schemas/videoschema')
router.get('/',async(req,res)=>{
    if (req.session.get){
        res.redirect('/userdashboar')
    }
    if (req.session.lan=="ru"){
    res.render('login',{
        message:"",
        clas:''
    })
}
else{
    res.render('loginuz',{
        message:"",
        clas:''
    })
}
})
router.post('/',async(req,res)=>{
    const userlogin=await User.findOne({email:req.body.email})
    const video=await Videos.findOne({idVideo:req.params.id})
    if (!userlogin){
        if (req.session.lan=="ru"){
        res.render('login',{
            message:"Ошибка электронной почты или пароля",
            clas:"btn btn-danger"
        })
    }
    else{
        res.render('loginuz',{
            message:"Parol Yoki Email Xato",
            clas:"btn btn-danger"
        })
    }
    }
    if(userlogin.email===req.body.email && userlogin.pass===req.body.pass){
        req.session.get=req.body.email;
        res.redirect('/userdashboar')
    }
    else{
        if (req.session.lan=="ru"){
        res.render('login',{
            message:"Ошибка электронной почты или пароля",
            clas:"btn btn-danger"
        }) 
    }
    else{
        res.render('loginuz',{
            message:"Parol Yoki Email Xato",
            clas:"btn btn-danger"
        }) 
    }
    }
})
module.exports=router;
