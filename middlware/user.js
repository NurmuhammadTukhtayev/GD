const express=require('express');
const {User}=require('../Schemas/userschema')
module.exports=async function(req,res,next){
    const useremail=await User.findOne({email:req.session.get})
    if (useremail){
    
 next();
    }
    else{
        res.redirect('/login')
    }
}