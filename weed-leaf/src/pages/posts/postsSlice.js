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
    postsList: {
        posts: [],
        status: 'idle',
        error: null
    }
}

// create post
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

// fetch post
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (formData, { rejectWithValue }) => {
    const response = await client.get('/api/posts', rejectWithValue)
    return response.posts
})

export const selectPostsListInfo = (state) => {
    return state.posts.postsList;
}

// setup slice
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.postsList.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.postsList.status = 'succeeded'
            state.postsList.posts = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.postsList.status = 'failed'
            state.postsList.error = action.error.message
        },
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
