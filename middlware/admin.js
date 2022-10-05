const express=require('express');
const {Admin}=require('../Schemas/adminschema')
module.exports=async function(req,res,next){
    if (req.session.admin===undefined){
        res.send('Murojat rad etildi! Sizga bu urlga kirish uchun huquq yo\'q')
    }
    const useremail=await Admin.findOne({adminname:req.session.admin})
    if (useremail){
 next();
    }
    else{
        res.send('Murojat rad etildi! Sizga bu urlga kirish uchun huquq yo\'q')
    }
}