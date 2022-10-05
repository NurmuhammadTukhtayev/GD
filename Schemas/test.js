const mongoose=require('mongoose')
const Joi=require('joi')
const schema=mongoose.Schema({
    lang:{
        type:String,
    },
    testid:{
type:Number
    },
    testquiz:{
        type:[String]
    },
    testvariant:{
        type:[String]
    },
    testans:{
        type:[String]
    }
})
const Test=mongoose.model('Test',schema)
function ValidateTest(req){
 const joischema={
     testid:Joi.number().required(),
     testquiz:Joi.string().required(),
     testvariant:Joi.string().required(),
     testans:Joi.string().required(),
 }
 return Joi.validate(req,joischema)
}
exports.ValidateTest=ValidateTest;
exports.Test=Test;
