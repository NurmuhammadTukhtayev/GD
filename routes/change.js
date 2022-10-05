const express=require('express');
const { User } = require('../Schemas/userschema');
const userMid=require('../middlware/user')
const router=express.Router();
router.get("/change",async(req,res)=>{
    req.session.lan=req.query.lang;
    res.redirect('/')
})
module.exports=router;