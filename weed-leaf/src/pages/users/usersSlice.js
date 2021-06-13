import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { getOauthToken } from '../oauth/oauthSlice'

// setup inital state
const initialState = {
    currentUser: null,
}

// user sign up
export const fetchCurrentUserInfo = createAsyncThunk('users/fetchCurrent', async (formData, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .post('/api/profile/', rejectWithValue, formData, customConfig)
    return response
})


// setup slice
export const usersSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchCurrentUserInfo.pending]: (state, action) => {
            state.currentUser = null
        },
        [fetchCurrentUserInfo.fulfilled]: (state, action) => {
            state.currentUser = action.payload
        },
        [fetchCurrentUserInfo.rejected]: (state, action) => {
            state.currentUser = null
        },
    }
})
  
export const { 
} = usersSlice.actions
  
export default usersSlice.reducer
