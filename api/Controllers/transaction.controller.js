import { addDoc, collection, getDocs, where,query, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig.js";


export const createTransaction=async(req,res)=>{
    const { userId, amount, category, description, date, type ,method }=req.body;
    try {
        if (!['income', 'expense'].includes(type)) {
            return res.status(400).json({ message: "Invalid type. Must be 'income' or 'expense'" });
          }
      
        const newTransaction = {
            userId,
            amount,
            category,
            description,
            date: new Date(date), // Ensure date is in Date format
            type,
            method,
          };
    const docRef = await addDoc(collection(db, "transactions"), newTransaction);
    res.status(201).json({ message: "Transaction created successfully", id: docRef.id });
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


export const getTransactionsByUser = async (req, res) => {
  const { userId } = req.params;
  const { type } = req.query; // Optional query parameter for filtering by type

  try {
    // Start with the base collection reference and initial query
    let transactionsRef = collection(db, "transactions");
    let q = query(transactionsRef, where("userId", "==", userId));

    // If the 'type' is provided and is valid, add it to the query
    if (type && ['income', 'expense'].includes(type)) {
      q = query(q, where("type", "==", type)); // Chain the 'type' filter to the existing query
    }

    // Fetch the results
    const transactionsSnapshot = await getDocs(q);
    const transactions = transactionsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Respond with the transactions
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTransactionById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const transactionDocRef = doc(db, "transactions", id);
      const transactionDoc = await getDoc(transactionDocRef);
  
      if (!transactionDoc.exists()) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      res.status(200).json({
        id: transactionDoc.id,
        ...transactionDoc.data(),
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const updateTransaction = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
  
    try {
      if (updates.type && !['income', 'expense'].includes(updates.type)) {
        return res.status(400).json({ message: "Invalid type. Must be 'income' or 'expense'" });
      }
  
      const transactionDocRef = doc(db, "transactions", id);
      await updateDoc(transactionDocRef, updates);
  
      res.status(200).json({ message: "Transaction updated successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  
  export const deleteTransaction = async (req, res) => {
    const { id } = req.params;
  
    try {
      const transactionDocRef = doc(db, "transactions", id);
      await deleteDoc(transactionDocRef);
  
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };