import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

// setup inital state
const initialState = {
    token: null,
    status: 'idle',
    error: null
}

// logs in the user
export const loginUser = createAsyncThunk('oauth/login', async (formData, { rejectWithValue }) => {
    const response = await client.post('/api/account/login', rejectWithValue, formData)
    return response
})

// user sign up
export const registerUser = createAsyncThunk('oauth/register', async (formData, { rejectWithValue }) => {
    const response = await client.post('/api/account/register', rejectWithValue, formData)
    return response
})
  
// setup slice
export const oauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [loginUser.pending]: (state, action) => {
            state.status = 'loading'
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = 'succeeded'
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
    }
})
  
export const { 
} = oauthSlice.actions
  
export default oauthSlice.reducer
