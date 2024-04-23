import { createSlice } from "@reduxjs/toolkit";
import SignIn from "../../pages/Signin";

const initialState ={
    currentUser: null,
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
            state.currentUser = action.payload;
            state.loading = false;
            state.error=null;
        },

        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;

        },
        updateStart :(state) =>{
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state, action) =>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) =>{
            state.loading = true;
            state.error = null;
        },
        deleteUserSuccess: (state) =>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) =>{
            state.loading = false;
            state.error = action.payload;

        
        },
        signOutSuccess: (state) => {
            state.currentUser =null;
            state.error = null;
            state.loading = false;
        },
    },

});


export const { SignInStart, signInSuccess, signInFailure, updateFailure, updateStart, updateSuccess, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutSuccess} = userSlice.actions;

export default userSlice.reducer;