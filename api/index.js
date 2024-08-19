import express from 'express';
import authRouter from './Routes/auth.routes.js'

const app=express();

app.use(express.json())

app.use('/api/auth',authRouter);

app.listen(3000,()=>{
    console.log('server is runing on port 3000');
})