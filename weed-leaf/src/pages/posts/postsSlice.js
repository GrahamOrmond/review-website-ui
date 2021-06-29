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

    // create form data
    let body = new FormData()
    formData.mediaFiles.forEach(file => {
        body.append('PostFiles', file, file.name)
    });
    delete formData.mediaFiles
    body.append('PostData', JSON.stringify(formData))

    const response = await client
        .post('/api/posts/', rejectWithValue, body, customConfig)
    return response
})

// fetch post
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (formData, { rejectWithValue }) => {
    let url = '/api/posts'
    if(formData)
        url += `?${new URLSearchParams(formData).toString()}`;
    const response = await client.get(url, rejectWithValue)
    return response.posts
})

// fetch brand by id
export const fetchPost = createAsyncThunk('posts/fetchPost',
async (fetchData, { getState, rejectWithValue }) => {
    const post = selectPostFetchData(getState(), fetchData)
    if(post)
        return post
    let url = `/api/posts/${fetchData.displayName}/${fetchData.urlId}`
    const response = await client.get(url, { rejectWithValue })
    return response
})

export const selectPostsListInfo = (state) => {
    return state.posts.postsList;
}

export const selectPostView = (state) => {
    return state.posts.viewPost
} 

export const selectPostFetchData = (state, fetchData) => {
    return state.posts.postsList.posts
        .find(post => post.urlId === fetchData.urlId
            && post.displayName === fetchData.displayName);
} 
  

// setup slice
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPostView(state, action) {
            state.viewPost = {
                post: null,
                status: 'idle',
                error: null
            }
          }
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
        [fetchPost.pending]: (state, action) => {
            state.viewPost.status = 'loading'
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.viewPost.status = 'succeeded'
            state.viewPost.post = action.payload;
        },
        [fetchPost.rejected]: (state, action) => {
            state.viewPost.status = 'failed'
            state.viewPost.error = action.error.message
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
    clearPostView,
} = postsSlice.actions
  
export default postsSlice.reducer
