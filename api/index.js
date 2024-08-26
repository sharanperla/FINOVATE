import express from 'express';
import authRouter from './Routes/auth.routes.js'
import categoryRouter from './Routes/category.route.js'
import transactionsRouter from './Routes/transaction.route.js'
import path from 'path'

const __dirname=path.resolve()

const app=express();

app.use(express.json())

app.use('/api/auth',authRouter);
app.use('/api/category',categoryRouter);
app.use('/api/transactions',transactionsRouter);
app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'cleint','dist','index.html'))
})

app.listen(3000,()=>{
    console.log('server is runing on port 3000');
})