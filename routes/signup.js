const express= require('express');
const router=express.Router();
const {Users} =require('../models');
const Joi = require('joi');


const schema = Joi.object({
    nickname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')),
        
    repeat_password: Joi.ref('password'),

    access_token: [
        Joi.string(),
        Joi.number()
    ]
})    


router.post('/signup',async(req,res)=>{
    const{nickname,password,confirm}=req.body
    //schema.validate({ nickname: 'Developer', password: 1234 });
    // try {
    //     const value = await schema.validateAsync({ nickname: 'Developer', password: 1234 });
    // }
    // catch (err) { errorMessage:"에러"}

    if(password!==confirm) {
        res.status(400).send({
            errorMessage:"패스워드가 패스워드 확인란과 일치하지 않습니다.",
        });
        return;
    }
    if(password.search(nickname)>-1){
        res.status(400).send({
            errorMessage:"비밀번호에 닉네임이 포함되어있습니다."
        })
        return;

    }
    
    const existUser=await Users.findAll({
        where:{nickname}
    });
    
    

    if(existUser.length){
        res.status(400).send({
            errorMessage:"이미 가입된 정보입니다."
        })
        return;
    }
    const user = new Users({nickname, password}); 
    await user.save();
    res.status(201).send({message:"가입완료"})
   
})


module.exports=router;
