const mongoose=require('mongoose');
const Joi=require('joi');
const schema=mongoose.Schema({
    lang:{
        type:String
    },
    idVideo:{
        type:String
    },
    videoname:{
        type:String
    },
    videomain:{
        type:String
    }
})
const Videos=mongoose.model('Videos',schema);
function ValidateVideo(req){
    const joischema={
        idVideo:Joi.string().required(),
        videoname:Joi.string().required(),
        videomain:Joi.string().required()
    }
    return Joi.validate(req,joischema);
}
exports.Videos=Videos;
exports.ValidateVideo=ValidateVideo;