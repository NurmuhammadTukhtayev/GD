const express=require('express')
const router=express.Router();
const {User,ValidateUser}=require('../Schemas/userschema')
router.get('/',(req,res)=>{
    if (req.session.lan=="ru")
    {
    res.render('applye',{
        message:'',
        clas:'',
    })
}else{
    res.render('applyeuz',{
        message:'',
        clas:'',
    })
}
})
router.post('/',async(req,res)=>{
const{error}=ValidateUser(req.body)
if(error){
    if (req.session.lan=="ru"){
    res.render('applye',{
        message:"Произошла ошибка при заполнении данных.",
        clas:'btn btn-danger'
    })
}
else{
    res.render('applyeuz',{
        message:"Malumotlarni to'ldirishda xatolikka yo'l qo'yildi.",
        clas:'btn btn-danger'
    })
}
   
}
else {
    const useremail=await User.findOne({email:req.body.email})
    if (useremail){
        if (req.session.lan=="ru")
        {
            res.render('applye',{
                message:'Такой пользователь зарегистрирован.',
                clas:'btn btn-danger'
            })
        }
        else{
            res.render('applyeuz',{
                message:'Bunaqa Foydalanuvchi Mavjud',
                clas:'btn btn-danger'
            })
        }
       
    }
    else{
        const user= new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        
        pass:req.body.pass,
        email:req.body.email,
        date:req.body.date,
        member_level:req.body.member_level,
        module:[0,0,0,0,0,0,0,0,0,0,0,0]
            }) 
        await user.save()
        req.session.get=req.body.email;
        res.redirect('/userdashboar');
        }
}
})
module.exports=router;
