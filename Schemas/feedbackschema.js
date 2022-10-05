const mongoose=require('mongoose')
const Joi=require('joi');
const schema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    feedback:{
        type:String
    }
})
const Feedback=new mongoose.model('Feedback',schema);
function ValidateFeedback(req){
const joischema={
    name:Joi.string().required(),
    email:Joi.string().required(),
    message:Joi.string().required()
}
return Joi.validate(req,joischema);
}
exports.Feedback=Feedback;
exports.ValidateFeedback=ValidateFeedback;