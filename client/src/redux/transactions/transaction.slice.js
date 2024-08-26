import { createSlice } from "@reduxjs/toolkit";


const initialState={
    transactions:{},
    error:null,
    loading:false,
    transactionLoading:false
};

const transactionSlice=createSlice({
    name:'transaction',
    initialState,
    reducers:{
        addTransactionStart:(state)=>{
            state.transactionLoading=true
            state.error=null;
        },
        addTransactionSuccess:(state)=>{
            state.transactionLoading=false;
            state.error=null;
        },
        addTransactionFailure:(state,action)=>{
            state.transactionLoading=action.payload;
            state.loading=false;
        },
        fetchTransactionsStart:(state)=>{
            state.loading=true
            state.error=null;
        },
        fetchTransactionsSuccess:(state,action)=>{
            state.transactions=action.payload,
            state.loading=true
            state.error=null;
        },
        fetchTransactionFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },
        deleteTransactionsStart:(state)=>{
            state.loading=true
            state.error=null;
        },
        deleteTransactionsSuccess:(state,action)=>{
            state.transactions=state.transactions.filter((transaction) => !action.payload.includes(transaction.id))
            state.loading=true
            state.error=null;
        },
        deleteTransactionFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        },

    }
})

export const {addTransactionFailure,addTransactionSuccess,addTransactionStart,fetchTransactionsStart,fetchTransactionsSuccess,fetchTransactionFailure,deleteTransactionFailure,deleteTransactionsStart,deleteTransactionsSuccess}=transactionSlice.actions;

export default transactionSlice.reducer;