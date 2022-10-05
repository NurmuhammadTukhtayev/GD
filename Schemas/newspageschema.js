const mongoose=require('mongoose');
const Joi=require('joi');
const schema=mongoose.Schema({
    lang:{
        type:String
    },
    header:{
        type:String
    },
    main:{
        type:String
    }
})
const News=mongoose.model('News',schema);
function ValidateHeader(req){
    const joischema={
        header:Joi.string().required(),
        main:Joi.string().required()
    }
    return Joi.validate(req,joischema);
}
exports.News=News;
exports.ValidateHeader=ValidateHeader;