const express= require('express');
const router=express.Router();
const authMiddleware= require('../middlewares/auth-middleware')

//댓글생성
router.post('/comments/:postId',authMiddleware,async(req,res)=>{
    const {postId } = req.params;
    const {comment} = req.body;

    await comment.create({comment})
        res.send({message:"안녕하세요 댓글입니다.!"})
})
//댓글 목록조회
router.get('/comments/:postId',async(req,res)=>{
    const {postId} = req.params;
    const comment = await comment.find({postId: postId}).select('postId user password comment')
    res.json(comment)

})
//댓글 수정

router.put('/comments/:commentId',authMiddleware,async(req,res)=>{
    const {commentId} = req.params;
    const {password,comment} = req.body;
    console.log(password,comment)
    const existsComments = await comment.find({commentId: comment})
    if(password ===existsComments[0].password){
        await Comment.updateOne({postId})
        
    }
})
//댓글 삭제 
router.delete('/comments/:commentId',authMiddleware,async(req,res)=>{
    const {commentId} = req.params;
    const {password} = req.body;
    const existsComments = await comment.find({commentId: comment.id})
    if(password==existsComments[0].password){
        await Comment.deleteOne({commentId})
        res.json({message:"댓글 삭제 완료"})
    }
    res.json({message:"입력하신 정보가 일치하지 않습니다."})
})

module.exports=router;
