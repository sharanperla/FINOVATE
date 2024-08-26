import express from 'express'
import { createTransaction, deleteTransaction, getTransactionById, getTransactionsByUser, updateTransaction } from '../Controllers/transaction.controller.js';


const router=express.Router();


router.post("/create",createTransaction);
router.get("/getbyuser/:userId",getTransactionsByUser);
router.get("/getbyid/:id",getTransactionById);
router.put("/update/:id",updateTransaction);
router.delete("/delete/:id",deleteTransaction);

export default router