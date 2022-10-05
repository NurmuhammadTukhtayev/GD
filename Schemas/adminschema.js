const mongoose=require('mongoose');
const Joi=require('joi');
const schema=mongoose.Schema({
    adminname:{
        type:String
    },
    adminparol:{
        type:String
    }
})
const Admin=mongoose.model('Admin',schema);
function ValidateAdmin(req){
    const joischema={
        adminname:Joi.string().required(),
        adminparol:Joi.string().required()
    }
    return Joi.validate(req,joischema);
}
exports.Admin=Admin;
exports.ValidateAdmin=ValidateAdmin;