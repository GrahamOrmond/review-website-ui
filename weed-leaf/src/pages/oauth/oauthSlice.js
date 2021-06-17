import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { client } from '../../api/client'

// setup inital state
const initialState = {
    isLoggedIn: false,
    token: null,
    status: 'idle',
    error: null
}

// logs in the user
export const checkLogin = createAsyncThunk('oauth/checkLogin', async (data, { rejectWithValue }) => {
    const token = window.localStorage.getItem('session');
    if(!token)
        return rejectWithValue("No Token");
    return JSON.parse(token);
})

// logs in the user
export const loginUser = createAsyncThunk('oauth/login', async (formData, { rejectWithValue }) => {
    const response = await client.post('/api/account/login', rejectWithValue, formData)
    window.localStorage.setItem('session', JSON.stringify(response));
    return response
})

// user sign up
export const registerUser = createAsyncThunk('oauth/register', async (formData, { rejectWithValue }) => {
    const response = await client.post('/api/account/register', rejectWithValue, formData)
    return response
})

export const isUserLoggedIn = (state) => {
    return state.oauth.isLoggedIn
}

export const getOauthToken = (state) => {
    return state.oauth.token
}
  
// setup slice
export const oauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
        logoutUser(state, action) {
            window.localStorage.removeItem("session");
            state.isLoggedIn = false
            state.token = null
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        [loginUser.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [registerUser.pending]: (state, action) => {
            state.status = 'loading'
        },
        [registerUser.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.token = action.payload;
        },
        [registerUser.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [checkLogin.pending]: (state, action) => {
        },
        [checkLogin.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        [checkLogin.rejected]: (state, action) => {
            state.isLoggedIn = false;
            state.token = null
        },
    }
})
  
export const { 
    logoutUser,
} = oauthSlice.actions
  
export default oauthSlice.reducer
