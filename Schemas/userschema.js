const mongoose=require('mongoose')
const Joi=require('joi')
const schema=mongoose.Schema({
    firstname:{
        type:String,  
    },
    lastname:{
        type:String,
    },
    pass:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
  date:{
      type:String,
     },
  member_level:{
   type:String,
  },
  module:{
      type:[Number]
  },
})
const User=mongoose.model('User',schema)
function ValidateUser(req){
const joischema={
firstname:Joi.string().required(),
lastname:Joi.string().required(),
pass:Joi.string().min(8).required(),
email:Joi.string().min(5).required(),
date:Joi.string().required(),
member_level:Joi.string().required()
}
return Joi.validate(req,joischema);
}
exports.User=User;
exports.ValidateUser=ValidateUser;