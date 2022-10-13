const express= require('express');
const {post} = require('../models/');
const router=express.Router();
const authMiddleware= require('../middlewares/auth-middleware')

//게시글 조회

    router.get('/post',async(req,res)=>{
        
        
        const postAll = await post.findAll({
        attributes:{exclude:['content']},
        order:[['createdAt',"DESC"]],    
        })

        res.json({
            postAll,
        })
});

//토큰값(로그인한자)이 있는 사람만 포스트 할수 있게 함

//게시글 작성
router.post('/post',authMiddleware,async(req,res)=>{
    const{ title,content} = req.body;
    await post.create({ title, content})
    res.send({"content":"안녕하세요 content 입니다."})
})

//게시글 상세조회
router.get('/post/:postId',authMiddleware,async(req,res)=>{
    const {postId } = req.params;
    const postAll = await post.findOne({
        where:{postId}
    })
    res.json({
        postAll,
    })
})

//게시글 수정
router.put('/post/:postId',authMiddleware,async(req,res)=>{
    const { postId } = req.params;
    const {password,title,content}=req.body;
    const existPost = await post.find({userId})
    if(password === existPost[0].password){
        await post.updateone({userId},{$set:{title, content}})
        return res.json({message:"게시글을 수정하였습니다."})
    }
    res.json({message:"입력하신 정보가 일치하지 않습니다."})
})

//게시글 삭제
router.delete('/post/:postId',authMiddleware,async(req,res)=>{
    const { postId } = req.params;
    const {password }  =req.body;
    const existPost = await post.find({userId});
    if(password === existPost[0].password){
        await post.deleteOne({userId});
        return res.json({message:"게시글 삭제완료"})
    }
    res.json({message:"입력 정보가 일치하지 않습니다."})
})


module.exports=router;