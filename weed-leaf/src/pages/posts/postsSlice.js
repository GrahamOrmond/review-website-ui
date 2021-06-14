import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { getOauthToken } from '../oauth/oauthSlice'

// setup inital state
const initialState = {
    viewPost: {
        post: null,
        status: 'idle',
        error: null
    },
    posts: {
        posts: [],
        status: 'idle',
        error: null
    }
}

// fetch create post
export const createPost = createAsyncThunk('posts/createPosts', async (formData, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .post('/api/posts/', rejectWithValue, formData, customConfig)
    return response
})


// setup slice
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: {
        [createPost.pending]: (state, action) => {
        },
        [createPost.fulfilled]: (state, action) => {
        },
        [createPost.rejected]: (state, action) => {
        },
    }
})
  
export const { 
} = postsSlice.actions
  
export default postsSlice.reducer
