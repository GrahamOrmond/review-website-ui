import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { getOauthToken } from '../oauth/oauthSlice'

// setup inital state
const initialState = {
    view: {
        displayName: null,
        status: "idle",
        error: null
    },
    list: {
        items: [],
        status: "idle",
        error: null
    },
}

// fetch user
export const fetchUser = createAsyncThunk('users/fetchUser',
  async (displayName, { rejectWithValue }) => {
    const response = await client
        .get('/api/profile/?displayName=' + displayName, 
            rejectWithValue)
    return response
})

// follow profile
export const followProfile = createAsyncThunk('users/followProfile',
async (formData, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .post('/api/profile/follow', rejectWithValue, formData, customConfig)
    return response
})

// unfollow profile
export const unfollowProfile = createAsyncThunk('users/unfollowProfile',
async (profileId, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .delete('/api/profile/follow/' + profileId, rejectWithValue, customConfig)
    return response
})

// return user view
export const getUserView = (state) => {
    return state.users.view
}

// return user from list by display name
export const getUserByDisplayName = (state, displayName) => {
    return state.users.list.items
        .find(u => u.displayName === displayName)
}


// setup slice
export const usersSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
        clearUserView(state, action){
            state.view = {
                user: null,
                status: 'idle',
                error: null
            }
        }
    },
    extraReducers: {
        // FETCH USER
        [fetchUser.pending]: (state, action) => {
            state.view = {
                profileId: null,
                displayName: action.meta.arg,
                status: 'loading',
                error: null
            }
        },
        [fetchUser.fulfilled]: (state, action) => {
            let user = {...action.payload}
            state.list.items = state.list.items.concat(user)

            state.view.profileId = user.profileId
            state.view.status = 'succeeded'
        },
        [fetchUser.rejected]: (state, action) => {
            state.view.status = 'failed'
            state.view.error = action.error.message
        },

        // FOLLOW USER PROFILE
        [followProfile.pending]: (state, action) => {
            let index = state.list.items
                .findIndex(u => u.profileId === action.meta.arg.id);
            if(index !== -1){
                state.list.items[index].isFollowing = true
            }
        },
        [followProfile.fulfilled]: (state, action) => {
        },
        [followProfile.rejected]: (state, action) => {
            let index = state.list.items
                .findIndex(u => u.profileId === action.meta.arg);
            if(index !== -1){
                state.list.items[index].isFollowing = false
            }
        },

        // UNFOLLOW USER PROFILE
        [unfollowProfile.pending]: (state, action) => {
            let index = state.list.items
                .findIndex(u => u.profileId === action.meta.arg);
            if(index !== -1){
                state.list.items[index].isFollowing = false
            }
        },
        [unfollowProfile.fulfilled]: (state, action) => {
        },
        [unfollowProfile.rejected]: (state, action) => {
            let index = state.list.items
                .findIndex(u => u.profileId === action.meta.arg);
            if(index !== -1){
                state.list.items[index].isFollowing = true
            }
        },
    }
})
  
export const { 
    clearUserView,
} = usersSlice.actions
  
export default usersSlice.reducer
