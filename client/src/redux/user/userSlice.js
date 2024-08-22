import { createSlice } from "@reduxjs/toolkit";


const initialState={
    currentUser:null,
    error:null,
    loading:false,
};

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true ;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{

            state.error=action.payload;
            state.loading=false;
        },
        signUpStart:(state)=>{
            state.loading=true;
        },
        signUpSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signUpFailure:(state,action)=>{
            console.log(action);
            state.error=action.payload;
            state.loading=false;
        },
        signOutStart:(state)=>{
            state.loading=true;
        },
        signOutSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signOutFailure:(state,action)=>{
            console.log(action);
            state.error=action.payload;
            state.loading=false;
        }, 
    }
})

export const {signUpStart,signUpSuccess,signUpFailure,signInStart,signInSuccess,signInFailure,signOutStart,signOutFailure,signOutSuccess } = userSlice.actions;
 export default userSlice.reducer;