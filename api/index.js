import express from 'express';
import authRouter from './Routes/auth.routes.js'
import categoryRouter from './Routes/category.route.js'
import transactionsRouter from './Routes/transaction.route.js'

const app=express();

app.use(express.json())

app.use('/api/auth',authRouter);
app.use('/api/category',categoryRouter);
app.use('/api/transactions',transactionsRouter);

app.listen(3000,()=>{
    console.log('server is runing on port 3000');
})