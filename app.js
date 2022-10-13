//const { Router } = require('express');
const express = require('express')
const app = express();
const PORT = 8080


const loginRouter = require('./routes/login')
const postRouter = require('./routes/post')
const signupRouter = require('./routes/signup')
const commentRouter = require('./routes/comments')

app.use(express.json());

app.use('/',signupRouter)
app.use('/',commentRouter)
app.use('/',postRouter)
app.use('/',loginRouter)




app.listen(PORT,()=>{
    console.log(` ${PORT} 포트 연결 성공`)
}); //
