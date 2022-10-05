const express=require('express');
const app=express()
const qrcode=require('qrcode')
const path=require('path')
const fs = require('fs');
const testFolder ='./public/uploads';
const multer=require('multer');
const router=express.Router();
const {User}=require('../Schemas/userschema')
const userMid=require('../middlware/user')
const adminMid=require('../middlware/admin')
const {News,ValidateHeader}=require('../Schemas/newspageschema');
const { ValidateFeedback, Feedback } = require('../Schemas/feedbackschema');
const {Videos,ValidateVideo}=require('../Schemas/videoschema');
const {Test,ValidateTest}=require('../Schemas/test');
const {Admin,ValidateAdmin}=require('../Schemas/adminschema');
const pdf=require('html-pdf')
const { object } = require('joi');
const { Sertifikat } = require('../Schemas/sertifikat');
router.get('/exit',async(req,res)=>{
    req.session.get="";
    res.redirect('/')
})
router.get('/',(req,res)=>{
    res.render('index2uz',{
        message:'',
        clas:''
    });
})
router.post('/test',async(req,res)=>{
    var testquiz=[]
    var testans=[]
    var testvari=[]
    var k=Object.entries(req.body)
    for (i=2;i<k.length;i++){
        if (k[i][0].includes('T'))
        testvari.push(k[i][1]);
        if (k[i][0].includes('Q'))
        testquiz.push(k[i][1]);
        if (k[i][0].includes('A'))
        testans.push(k[i][1]);
    }
    const alltests=await Test.findOne({testid:req.body.TestID,lang:req.body.lang})
    if (alltests){
    alltests.testquiz=testquiz;
    alltests.testvariant=testvari;
    alltests.testans=testans;
    await alltests.save();
    res.send('muvaffaqiyatli yangilandi!');
    }
    else{
        new Test({
            lang:req.body.lang,
            testid:req.body.TestID,
            testquiz:testquiz,
            testvariant:testvari,
            testans:testans,
        }).save()
        res.send('Muvaffaqiyatli saqlandi');
    }
})
router.post('/checktest/:id',async(req,res)=>{
    var array1;
    array1=await Test.findOne({testid:parseInt(req.params.id),lang:req.session.lan})
    const z=Object.entries(req.body)
    var l=0;
    const userresult=await User.findOne({email:req.session.get})
    console.log(array1.testans);
    var ans=[];
var javob=[];
    for (i=0;i<z.length;i++){
        console.log(array1.testans[i],z[i][1])
javob.push(z[i][1])
ans.push(array1.testans[i])       
 if (array1.testans[i].trim()==z[i][1].trim()){
            l+=1;
        } 
        else{
            console.log(i);
        }
    }
    console.log(z);
    console.log(l);
    var u=[]
     u=userresult.module;
        var j=[];
        for (i=0;i<u.length;i++){
          if (u[i]<l && i==parseInt(req.params.id)-1)
          {
              j.push(l);
          }
          else j.push(u[i])
        }
        userresult.module=j
     await userresult.save();
     if (req.session.lan=="ru")
     {

    res.render('module11',{
        foiz:(100/array1.testquiz.length)*userresult.module[parseInt(req.params.id)-1],
        id:req.params.id,
        ans:[],
        javob:[],
        nomi:`#Модуль ${req.params.id}`,
        natija:userresult.module[parseInt(req.params.id)-1],
        nechta:array1.testquiz.length,
        quiz:array1.testquiz,
        variant:array1.testvariant,
        fname:userresult.firstname,
        lname:userresult.lastname
    })
}else{
    res.render('module11uzz',{
        foiz:(100/array1.testquiz.length)*userresult.module[parseInt(req.params.id)-1],
        id:req.params.id,
        ans:[],
        javob:[],
        nomi:`#Модуль ${req.params.id}`,
        natija:userresult.module[parseInt(req.params.id)-1],
        nechta:array1.testquiz.length,
        quiz:array1.testquiz,
        variant:array1.testvariant,
        fname:userresult.firstname,
        lname:userresult.lastname
    })
}
    
})
router.get('/testget/:id',userMid,async(req,res)=>{
    console.log(req.params.id)
    var alltest1,alltest;
    alltest=await Test.findOne({testid:parseInt(req.params.id)}) 
   console.log(alltest)
    const userresult=await User.findOne({email:req.session.get})
    res.render('module11uzz',{
        foiz:(100/alltest.testquiz.length)*userresult.module[parseInt(req.params.id)-1],
        id:req.params.id,
        ans:[],
        javob:[],
        nomi:`#Modul ${req.params.id}`,
        natija:userresult.module[parseInt(req.params.id)-1],
        nechta:alltest.testquiz.length,
        quiz:alltest.testquiz,
        variant:alltest.testvariant,
        fname:userresult.firstname,
        lname:userresult.lastname
    })
})
router.get('/otziv',userMid,async(req,res)=>{
    const userresult=await User.findOne({email:req.session.get})
    if( req.session.lan=="ru"){
    res.render('otziv',{
        fname:userresult.firstname,
        lname:userresult.lastname
    })
}
else{
    res.render('otzivuz',{
        fname:userresult.firstname,
        lname:userresult.lastname
    })
}
})
router.get('/result',userMid,async(req,res)=>{
    const userresult=await User.findOne({email:req.session.get})
    if (req.session.lan=="ru"){
    res.render('result',{
        natija1:userresult.module[0],
        natija2:userresult.module[1],
        natija3:userresult.module[2],
        natija4:userresult.module[3],
        natija5:userresult.module[4],
        natija6:userresult.module[5],
        natija7:userresult.module[6],
        natija8:userresult.module[7],
        natija9:userresult.module[8],
        natija10:userresult.module[9],
        natija11:userresult.module[10],
        natija12:userresult.module[11],
        fname:userresult.firstname,
        lname:userresult.lastname,
    })
}else{
    res.render('resultuz',{
        natija1:userresult.module[0],
        natija2:userresult.module[1],
        natija3:userresult.module[2],
        natija4:userresult.module[3],
        natija5:userresult.module[4],
        natija6:userresult.module[5],
        natija7:userresult.module[6],
        natija8:userresult.module[7],
        natija9:userresult.module[8],
        natija10:userresult.module[9],
        natija11:userresult.module[10],
        natija12:userresult.module[11],
        fname:userresult.firstname,
        lname:userresult.lastname,
    })
}
})
router.get('/obnavitparol',userMid,async(req,res)=>{
    const userresult=await User.findOne({email:req.session.get})
    if (req.session.lan=="ru"){
    res.render('obnovitparol',{
        fname:userresult.firstname,
        lname:userresult.lastname,
        message:"Loading..."
    })
}else{
    res.render('obnovitparoluz',{
        fname:userresult.firstname,
        lname:userresult.lastname,
        message:"Loading..."
    })
}
})
router.post('/obnovitparol',userMid,async(req,res)=>{
    const userresult=await User.findOne({email:req.session.get})
    if (req.body.old==userresult.pass){
        userresult.pass=req.body.new
        userresult.save()
        if (req.session.lan=="ru")
        {
            res.render('obnovitparol',{
                fname:userresult.firstname,
                lname:userresult.lastname,
                message:"Пароль обновлен"
            })      
        }
        else{
        res.render('obnovitparoluz',{
            fname:userresult.firstname,
            lname:userresult.lastname,
            message:"Parol yangilandi!"
        })
    }
    }
    else{
        if (req.session.lan=="ru")
        {
        res.render('obnovitparol',{
            fname:userresult.firstname,
            lname:userresult.lastname,
            message:"Ошибка"
        })
    }
    else{
        res.render('obnovitparoluz',{
            fname:userresult.firstname,
            lname:userresult.lastname,
            message:"Xatolik"
        })
    }
    }
})
router.get('/polzovatel', userMid,async(req,res)=>{
    const userresult=await User.findOne({email:req.session.get})
    if (req.session.lan=="ru"){
    res.render('polzo',{
        fname:userresult.firstname,
        lname:userresult.lastname,
        email:userresult.email,
        pass:userresult.pass
    })
}
else{
    res.render('polzouz',{
        fname:userresult.firstname,
        lname:userresult.lastname,
        email:userresult.email,
        pass:userresult.pass
    })
}
})
router.post('/otziv',userMid,(req,res)=>{
    const {error}=ValidateFeedback(req.body)
    if(error){
        res.redirect('/otziv')
    }
    new Feedback({
        name:req.body.name,
        email:req.body.email,
        feedback:req.body.feedback,
    }).save();
    res.redirect('/otziv');
})
router.post('/userprofil',(req,res)=>{
    console.log(req.body);
    const {error}=ValidateFeedback(req.body)
    if(error){
        res.redirect('/userdashboar')
    }
    new Feedback({
        name:req.body.name,
        email:req.body.email,
        feedback:req.body.message,
    }).save();
    res.redirect('/userdashboar');
})
router.get('/userdashboar',userMid,async(req,res)=>{
    const userresult=await User.findOne({email:req.session.get})
    const news=await News.findOne({__v:0});
    if (req.session.lan=="ru")
    {
    res.render('indexuser',{
        header:"salom",
        message:"salom",
        fname:userresult.firstname,
        lname:userresult.lastname
    })
}else{
    res.render('indexuseruz',{
        header:"salom",
        message:"salom",
        fname:userresult.firstname,
        lname:userresult.lastname
    })
}
})
// router.get('/userprofil',userMid,async(req,res)=>{
//     const video=await Videos.find({__v:0})
//      res.render('index',{
//      data:video
//       })
//   })
router.get('/module-1',userMid,async(req,res)=>{
    const userresult=await User.findOne({email:req.session.get})
        const video=await Videos.find({lang:req.session.lan})
        if (req.session.lan=="ru")
 {
        res.render('Module1',{
        data:video,
        fname:userresult.firstname,
        lname:userresult.lastname
    })
}
    else{
        res.render('Module1uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
})
router.get('/module-2',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:1,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){
        if(req.session.lan=="ru"){
        res.render('Module2',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    else{
        res.render('Module2uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
      
    }
   })
   router.get('/module-3',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:2,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){
        if(req.session.lan=="ru"){
       res.render('Module3',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }
    else{
        res.render('Module3uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
    
   })
   router.get('/module-4',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:3,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){
        if (req.session.lan=="ru"){
       res.render('Module4',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module4uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-5',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:4,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){
        if (req.session.lan=="ru"){
       res.render('Module5',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module5uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-6',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:5,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){
    if (req.session.lan=="ru"){
       res.render('Module6',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module6uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-7',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:6,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){
        if (req.session.lan=="ru"){
       res.render('Module7',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module7uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-8',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:7,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){ 
        if (req.session.lan=="ru"){
    res.render('Module8',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module8uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-9',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:8,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if ( 1==1){  
        if (req.session.lan=="ru"){
       res.render('Module9',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }
    else{
        res.render('Module9uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }
    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-10',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:9,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if (1==1){  
        if (req.session.lan=="ru"){
       res.render('Module10',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module10uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }

    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-11',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:9,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if (1==1){  
        if (req.session.lan=="ru"){
       res.render('Module11',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module11uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }

    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
   router.get('/module-12',userMid,async(req,res)=>{
    var video,alltest;
         video=await Videos.find({lang:req.session.lan})
         alltest=await Test.findOne({testid:9,lang:req.session.lan}) 
    const userresult=await User.findOne({email:req.session.get})
    if (1==1){  
        if (req.session.lan=="ru"){
       res.render('Module12',{
           data:video,
           fname:userresult.firstname,
           lname:userresult.lastname
       })
    }else{
        res.render('Module12uz',{
            data:video,
            fname:userresult.firstname,
            lname:userresult.lastname
        })
    }
    }

    else{
        if (req.session.lan=="ru"){
            res.render('forms-validation',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
        else{
            res.render('forms-validationuz',{
                fname:userresult.firstname,
                lname:userresult.lastname
            })
        }
    }
   })
router.get('/feedbacks',adminMid,async(req,res)=>{
    const data3=await Feedback.find()
    res.render('feedback',{
        data:data3
    })
})
router.post('/blank',adminMid,async(req,res)=>{
    const {error}=ValidateVideo(req.body)
    if (error){
        const data0=await Videos.find();
        res.render('blank',{
            message:'Malumotlarni kiritishhda xatolikka yo\'l qo\'yildi',
            clas:'btn btn-danger',
            data:data0
        })
    }
    const vide=await Videos.findOne({idVideo:req.body.idVideo,lang:req.body.lang})
    if (!vide){
    const addvideo= new Videos({
        lang:req.body.lang,
        idVideo:req.body.idVideo,
        videoname:req.body.videoname,
        videomain:req.body.videomain
    })
    await  addvideo.save();
    const data1=await Videos.find();
    res.render('blank',{
        message:'Muvaffaqiyatli saqlandi',
        clas:'btn btn-success',
        data:data1
    })  
}
else{
    vide.videoname=req.body.videoname
    vide.videomain=req.body.videomain
    await vide.save();
    const data=await Videos.find();
    res.render('blank',{
        message:'Muvaffaqiyatli yangilandi',
        clas:'btn btn-success',
        data:data
    })
}
})
router.get('/blank',adminMid,async(req,res)=>{
     const allvideos=await Videos.find();
    res.render('blank',{
        message:'',
        clas:'',
        data:allvideos
    })
    })
router.post('/form',adminMid,async(req,res)=>{
    const{error}=ValidateHeader(req.body);
    if (error){
        res.render('form',{
            message:'Kiritshdagi Xatolik!',
            clas:'btn btn-danger'
        })
    }
const updatenews=await News.findOne({__v:0});
if (!updatenews){
new News({
    lang:req.body.lang,
    header:req.body.header,
    main:req.body.main
  }).save(); 
  res.render('form',{
    message:'Muvaffiqatli',
    clas:'btn btn-primary'
})
    }
    else{
        updatenews.lang=req.body.lang;
        updatenews.header=req.body.header;
        updatenews.main=req.body.main;
        await updatenews.save();
        res.render('form',{
            message:'Muvaffiqatli o\'zgartirildi!',
            clas:'btn btn-primary'
        })  
    }
})
router.get('/getsertifikat/:id',async(req,res)=>{
    const getser=await Sertifikat.findOne({uid:req.params.id});
    if (!getser){
        res.render("newuz",{
            header:"Bunaqa Foydalanuvchi topilmadi!",
            message:"Soxta sertifikat aniqlandi!"
        })
    }else{
        res.render("newuz",{
            header:"Tabriklayman Biz Sizni Topdik!",
            message:getser.fullname,
            daraja: getser.daraja,
            percent:getser.foiz,  
            date:getser.date,
        })
    }
})
router.get('/certificate',userMid,async(req,res)=>{
    function percentage1(partialValue, totalValue) {
        let fffz=((100 * partialValue) / totalValue);
        return fffz;
    }
    function percentage(partialValue, totalValue) {
        let fff=((100 * partialValue) / totalValue);
        if (fff<=71){
            return "Qoniqarsiz daraja";
        }else if (fff<=79){
            return "Qoniqarli daraja";
        }else if (fff<=85){
            return "Yaxshi daraja";
        }else if (fff<=100){
            return "Alo daraja";
        }
     }
    const alltest=await Test.find();
    let testcounts=0;
    let testtrueans=0;
    for (let ix=0;ix<alltest.length;ix++){
        testcounts+=alltest[ix].testquiz.length;
    } 

    
    const userresult=await User.findOne({email:req.session.get})
    for (let ix=0;ix<12;ix++){
        testtrueans+=userresult.module[ix];
    } 
    console.log(testtrueans)
    var today = new Date();
 var dd = String(today.getDate()).padStart(2, '0');
 var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
 var yyyy = today.getFullYear();
 today = mm + '/' + dd + '/' + yyyy;
 var uidd=Math.floor(Math.random() * 99999999999);
    new Sertifikat({
        fullname:userresult.firstname+" "+userresult.lastname,
        email:req.session.get,
        foiz:percentage1(testtrueans,testcounts),
        daraja:percentage(testtrueans,testcounts),
        date:today,
        uid:uidd
    }).save();
    let options = {
        daraja:percentage(testtrueans,testcounts),
        qrcode:"",
        ism: userresult.firstname+" "+userresult.lastname,
        format: "Letter",
        orientation: "landscape",
      border: {
        top: '0in', 
        right: '0.1cm',
        bottom: '0in',
        left: '0in'
      },
      }
      var urls = req.protocol + '://' + req.get('host') + "/getsertifikat";
      qrcode.toDataURL(`${urls}/${uidd}`,(err,src)=>{
        options.qrcode=src;
        res.render('sertifikat.ejs', options, (err, data) =>{
            console.log(err)
            if (err) return res.status(404).json({
              error: err
            })
            pdf.create(data, options).toStream(function (err, stream) {
              console.log({ 'errcreate': err })
              if (err) return res.end(err.stack)
            res.setHeader('Content-Type', 'application/pdf');
              res.setHeader('Content-Disposition', 'attachment; filename=Sertifikat.pdf');
              stream.pipe(res);});
          });
       
      })
      
})
router.get('/upload',adminMid,(req,res)=>{
    res.render('bookupload');
})
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
      cb(null,file.originalname);
    }
  });
  const upload = multer({
    storage: storage,
    limits:{fileSize: 100000000},
  }).single('myBook');
  router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
      if(err){
    res.send(err) 
    } else {
        if(req.file == undefined){
          res.send('Iltimos Qayna urinib kuring!');
        } else {
          res.redirect(`/upload`);
      }
    }
});
});
const storages = multer.diskStorage({
    destination: './public/imag/',
    filename: function(req, file, cb){
      cb(null,file.originalname);
    }
  });
  const uploadimg = multer({
    storage: storages,
    limits:{fileSize: 100000000},
  }).single('myImage');
  router.post('/uploadimg', (req, res) => {
    uploadimg(req, res, (err) => {
      if(err){
    res.send(err) 
    } else {
        if(req.file == undefined){
          res.send('Iltimos Qayna urinib kuring!');
        } else {
            res.redirect(`/upload`);
      }
    }
});
});
router.get('/admin',(req,res)=>{
    res.render('admin')
})
router.post('/adminvalidate',async(req,res)=>{
    const adminvalidate=await  Admin.findOne({adminname:req.body.adminname})
    if (!adminvalidate){
        res.redirect('/admin')
    }
    if (adminvalidate.adminname===req.body.adminname && adminvalidate.adminparol===req.body.adminparol){
        req.session.admin=req.body.adminname;
        res.redirect('/admindashboard')
    }
    else{
        res.redirect('/admin')     
    }
})
router.get('/admindashboard',adminMid,(req,res)=>{
    res.render('index1');
})
router.get('/library',(req,res)=>{
   res.redirect('/')
})
router.post('/adminNewparol',async(req,res)=>{
  
    const newadmin=await Admin.findOne({adminname:req.body.adminname})
    if (!newadmin){
        new Admin({
            adminname:req.body.adminname,
            adminparol:req.body.adminparol
        }).save()
    }
    else{
        newadmin.adminname=req.body.adminname;
        newadmin.adminparol=req.body.adminparol;
        await newadmin.save();
    }
}) 
router.get('/form',adminMid,(req,res)=>{
    res.render('form',{
        message:'',
        clas:''
    });
})
router.get('/news',async(req,res)=>{
    const news=await News.findOne({lang:req.session.lan});
    if (req.session.lan=="ru")
    {
    res.render('news',{
        header:news.header,
        message:news.main
    })
}else{
    res.render('newuz',{
        header:"sa",
        message:"sadsadas"
    })
}
})
router.get('/chart',adminMid,(req,res)=>{
    res.render('chart')
})
router.get('/table',adminMid,async(req,res)=>{
    const users=await User.find().sort({firstname:1});
    res.render('table',{
        data:users
    })
})
router.get('/deleteAlluser',adminMid,async(req,res)=>{
    await User.deleteMany({__v:0})
    res.send("Malutomlar uchirildi!")
})
router.get('/alluser',adminMid,async(req,res)=>{
    const users=await User.find();
    res.send(users).status(200);
})
router.get('/:id',(req,res)=>{
    res.render('book',{
        src:req.params.id
    })
})
module.exports=router;