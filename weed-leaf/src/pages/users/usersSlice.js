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
        users: [],
        status: "idle",
        error: null
    },
}

const postState = {
    timeLoaded: null,
    status: 'idle',
    error: null
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
    return state.users.list.users
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
        [fetchUser.pending]: (state, action) => {
            state.view = {
                user: action.meta.arg,
                status: 'loading',
                error: null
            }
        },
        [fetchUser.fulfilled]: (state, action) => {
            let user = {...action.payload}
            user.reviews = postState
            user.questions = postState
            user.threads = postState
            state.list.users = state.list.users.concat(user)
            state.view = {
                profileId: user.profileId,
                displayName: user.displayName
            } 
            state.view.status = 'succeeded'
        },
        [fetchUser.rejected]: (state, action) => {
            state.view = {
                user: action.meta.arg,
                status: 'failed',
                error: action.error.message
            }
        },

        [followProfile.pending]: (state, action) => {
            let index = state.list.users
                .findIndex(u => u.profileId === action.meta.arg.id);
            if(index !== -1){
                state.list.users[index].isFollowing = true
            }
        },
        [followProfile.fulfilled]: (state, action) => {
            
        },
        [followProfile.rejected]: (state, action) => {
            let index = state.list.users
                .findIndex(u => u.profileId === action.meta.arg);
            if(index !== -1){
                state.list.users[index].isFollowing = false
            }
        },

        [unfollowProfile.pending]: (state, action) => {
            let index = state.list.users
                .findIndex(u => u.profileId === action.meta.arg);
            if(index !== -1){
                state.list.users[index].isFollowing = false
            }
        },
        [unfollowProfile.fulfilled]: (state, action) => {
        },
        [unfollowProfile.rejected]: (state, action) => {
            let index = state.list.users
                .findIndex(u => u.profileId === action.meta.arg);
            if(index !== -1){
                state.list.users[index].isFollowing = true
            }
        },



    }
})
  
export const { 
    clearUserView,
} = usersSlice.actions
  
export default usersSlice.reducer
