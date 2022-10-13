const express= require('express');
const router=express.Router();
const jwt = require('jsonwebtoken');

const {Users} =require('../models');

 router.post('/login',async(req,res)=>{
    const {nickname,password}=req.body;

    const user = await Users.findOne({
        where:{nickname}
    })
    


    if(!user||password !==user.password){
        res.status(400).send({
            errorMessage:"닉네임 또는 패스워드가 틀렸습니다."
        })
        return;
    }
    res.send({
        token:jwt.sign({userId:user.userId},"my-secret-key")
    })

 })
module.exports=router;