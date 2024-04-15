import { createSlice } from "@reduxjs/toolkit";
import SignIn from "../../pages/Signin";

const initialState ={
    currentUSer: null,
    error:null,
    loading: false
}

const userSlice= createSlice({
    name:'user',
    initialState,
    reducers:{
        SignInStart:(state) =>{
            state.loading =true;
            state.error = null;
        },

        signInSuccess: (state, action) =>{
            state.currentUSer = action.payload;
            state.loading = false;
            state.error=null;
        },

        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },
    },

});


export const { SignInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;