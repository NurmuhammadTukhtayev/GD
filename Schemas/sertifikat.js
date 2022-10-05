const mongoose=require('mongoose')
const Joi=require('joi');
const schema=mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    foiz:{
        type:Number
    },
    daraja:{
        type:String
    },
    date:{
        type:String
    },
    uid:{
        type:String
    }
})
const Sertifikat=new mongoose.model('Sertifikat',schema);
function ValidateSertifikat(req){
const joischema={
    name:Joi.string().required(),
    email:Joi.string().required(),
    message:Joi.string().required()
}
return Joi.validate(req,joischema);
}
exports.Sertifikat=Sertifikat;
exports.ValidateSertifikat=ValidateSertifikat;