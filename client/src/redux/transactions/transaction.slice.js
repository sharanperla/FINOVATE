import { createSlice } from "@reduxjs/toolkit";


const initialState={
    transactions:{},
    error:null,
    loading:false,
};

const transactionSlice=createSlice({
    name:'transaction',
    initialState,
    reducers:{
        addTransactionStart:(state)=>{
            state.loading=true
            state.error=null;
        },
        addTransactionSuccess:(state)=>{
            state.loading=false;
            state.error=null;
        },
        addTransactionFailure:(state,action)=>{
            state.error=action.payload;
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

    }
})

export const {addTransactionFailure,addTransactionSuccess,addTransactionStart,fetchTransactionsStart,fetchTransactionsSuccess,fetchTransactionFailure}=transactionSlice.actions;

export default transactionSlice.reducer;