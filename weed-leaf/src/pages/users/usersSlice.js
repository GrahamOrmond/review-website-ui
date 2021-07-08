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
    userView: {
        user: null,
        status: "idle",
        error: null
    },
}

const postState = {
    posts: null,
    status: 'idle',
    error: null
  }

// user sign up
export const fetchCurrentUserInfo = createAsyncThunk('users/fetchCurrent', async (formData, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .get('/api/profile/', rejectWithValue, customConfig)
    return response
})

// fetch user
export const fetchUserInfo = createAsyncThunk('users/fetchUser', async (displayName, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .get('/api/profile/?displayName=' + displayName, rejectWithValue, customConfig)
    return response
})

// fetch user posts
export const fetchUserPosts = createAsyncThunk('users/fetchUserPosts',
async (fetchData, { getState, rejectWithValue }) => {
  let url = `/api/posts?${new URLSearchParams(fetchData).toString()}`;
  const response = await client.get(url, { rejectWithValue })
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

export const selectUserView = (state) => {
    return state.users.userView;
}

export const selectCurrentUser = (state) => {
    return state.users.currentUser.user;
}


// setup slice
export const usersSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
        clearUserView(state, action) {
            state.userView = {
                user: null,
                status: "idle",
                error: null
            }
          }
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
            state.currentUser.error = ''
        },

        [fetchUserInfo.pending]: (state, action) => {
            state.userView.status = 'loading'
            state.userView.error = null
        },
        [fetchUserInfo.fulfilled]: (state, action) => {
            let user = {...action.payload}
            user.reviews = postState
            user.questions = postState
            user.threads = postState

            state.userView.user = user;
            state.userView.status = 'succeeded'
        },
        [fetchUserInfo.rejected]: (state, action) => {
            state.userView.status = 'failed'
            state.userView.user = null
            state.userView.error = ''
        },

        [fetchUserPosts.pending]: (state, action) => {
            state.userView.user[action.meta.arg.type].status = 'loading'
          },
        [fetchUserPosts.fulfilled]: (state, action) => {
            let setPayload = {
                posts: action.payload.posts,
                status: 'succeeded',
                error: null
            }
            state.userView.user[action.meta.arg.type] = setPayload
        },
        [fetchUserPosts.rejected]: (state, action) => {
            state.userView.user[action.meta.arg.type].status = 'failed'
            state.userView.user[action.meta.arg.type].error = action.error.message
        },

        
        [followProfile.pending]: (state, action) => {
            

        },
        [followProfile.fulfilled]: (state, action) => {
            if(state.userView.user.profileId === action.payload.profileId){
                state.userView.user.isFollowing = true
            }
            if (state.currentUser.user.followingList
                    .findIndex(f => f.profileId === action.payload.userProfileId) === -1){
                let following = [...state.currentUser.user.followingList]
                state.currentUser.user.followingList = following
            }
        },
        [followProfile.rejected]: (state, action) => {
        },

        [unfollowProfile.pending]: (state, action) => {
        },
        [unfollowProfile.fulfilled]: (state, action) => {
            if(state.userView.user.profileId === action.meta.arg){
                state.userView.user.isFollowing = false
            }
            let index = state.currentUser.user.followingList
            .findIndex(f => f.profileId === action.meta.arg) 
            if (index !== -1){
                let following = [...state.currentUser.user.followingList]
                following.splice(index, 1);
                state.currentUser.user.followingList = following
            }
        },
        [unfollowProfile.rejected]: (state, action) => {
        },



    }
})
  
export const { 
    clearUserView,
} = usersSlice.actions
  
export default usersSlice.reducer
