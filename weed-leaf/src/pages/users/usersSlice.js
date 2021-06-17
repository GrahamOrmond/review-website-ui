import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { getOauthToken } from '../oauth/oauthSlice'

// setup inital state
const initialState = {
    currentUser: {
        user: null,
        status: "idle",
        error: null
    },
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

export const selectCurrentUser = (state) => {
    return state.users.currentUser;
}


// setup slice
export const usersSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchCurrentUserInfo.pending]: (state, action) => {
            state.currentUser.status = 'loading'
            state.currentUser.error = null
        },
        [fetchCurrentUserInfo.fulfilled]: (state, action) => {
            state.currentUser.status = 'succeeded'
            state.currentUser.user = action.payload
        },
        [fetchCurrentUserInfo.rejected]: (state, action) => {
            state.currentUser.status = 'failed'
            state.currentUser.user = null
            state.currentUser.error = action.payload.message
        },
    }
})
  
export const { 
} = usersSlice.actions
  
export default usersSlice.reducer
