import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

// setup inital state
const initialState = {
    user: null,
}

// setup slice
export const oauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
    },
    extraReducers: {
    }
})
  
export const { 
} = oauthSlice.actions
  
export default oauthSlice.reducer
