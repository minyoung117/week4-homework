const jwt = require('jsonwebtoken');
const {Users} = require('../models');

module.exports = (req,res,next) => {
    const {authorization} = req.headers;
    const [authType,authToken]= authorization.split(" ");

    if(!authToken || authType !=="Bearer") {
        res.status(401).send({
            errorMessage:" 잘 좀 해봐"
        })
        return;
    }
    try{
        const {id}=jwt.verify(authToken,"my-secret-key");
        console.log(id)
        Users.findByPk(id).then((user)=>{
            res.locals.user=user;
            next();
        })
    }catch(err){
        res.status(401).send({
            errorMessage:"망할 "
        })
    }
}