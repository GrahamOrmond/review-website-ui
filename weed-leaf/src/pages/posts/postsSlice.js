import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { getAccessToken } from '../oauth/oauthSlice'

// setup inital state
const initialState = {
    view: {
        displayName: null,
        urlId: null,
        status: 'idle',
        error: null
    },
    list: {
        params: [],
        items: [],
        status: 'idle',
        error: null
    }
}

// create post
export const createPost = createAsyncThunk('posts/createPosts', async (formData, { getState, rejectWithValue }) => {
    const token = getAccessToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token}`
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
export const fetchPosts = createAsyncThunk('posts/fetchPosts', 
async (formData, { getState, rejectWithValue }) => {
    Object.keys(formData).forEach(k => formData[k] === undefined 
        && delete formData[k])
    const params = new URLSearchParams(formData).toString()
    let url = `/api/posts?${params}`;
    let response = await client.get(url, rejectWithValue)
    response.params = {
        params: params,
        timeStamp: new Date().getTime(),
        data: formData
    }
    // remove duplicates
    const state = getState()
    state.posts.list.items.forEach(post => {
    let index = response.posts.findIndex(p => p.postId === post.postId);
    if(index !== -1)
        response.posts.splice(index, 1)
    })
    return response
})

// fetch brand by id
export const fetchPost = createAsyncThunk('posts/fetchPost',
async (fetchData, { rejectWithValue }) => {
    let url = `/api/posts/${fetchData.displayName}/${fetchData.urlId}`
    const response = await client.get(url, { rejectWithValue })
    return response
})

// rate post
export const ratePost = createAsyncThunk('posts/ratePost', 
async (formData, { getState, rejectWithValue }) => {
    const token = getAccessToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await client
        .post('/api/posts/rate', rejectWithValue, formData, customConfig)
    return response
})

export const getPostsList = (state) => {
    return state.posts.list;
}


// returns posts list by given filter
// used to populate posts lists
export const getPostByFilter = (state, filter) => {
    // return list using filter
    return state.posts.list.items
        .filter((p) => {
            return (!filter.brandId || filter.brandId === p.brand.brandId)
            && (!filter.type || filter.type.toUpperCase() === p.type)
        })
}

export const getPostView = (state) => {
    return state.posts.view
} 

export const getPostById = (state, displayName, urlId) => {
    return state.posts.list.items
        .find(p => p.urlId.toLowerCase() === urlId.toLowerCase()
            && p.displayName.toLowerCase() === displayName.toLowerCase());
} 
  
export const getPostsSearchParams = (state, params) => {
    Object.keys(params).forEach(k => params[k] === undefined 
      && delete params[k])
    const paramsString = new URLSearchParams(params).toString()
    return state.posts.list.params
        .find(p => p.params.toLowerCase() === paramsString.toLowerCase());
} 
  

// setup slice
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPostView(state, action) {
            state.view = {
                displayName: null,
                urlId: null,
                status: 'idle',
                error: null
            }
        },
        addToPostCommentCount(state, action) {
            // update post list
            let postIndex = state.list.items
                .findIndex(p => p.postId === action.payload.postId);
            if(postIndex !== -1){ 
                state.list.items[postIndex].commentCount += 1
            }
        },
        setPostView(state, action) {
            state.view = {
                displayName: action.payload.displayName,
                urlId: action.payload.urlId,
                status: 'succeeded',
                error: null
            }
        },
        idlePostList(state, action) {
            state.list.status = 'idle'
        },
    },
    extraReducers: {
        // FETCH LIST OF POST
        [fetchPosts.pending]: (state, action) => {
            state.list.status = 'loading'
            state.list.error = null
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.list = {
                params: state.list.params.concat([action.payload.params]),
                items: state.list.items.concat(action.payload.posts),
                status: 'succeeded',
                error: null
            }
        },
        [fetchPosts.rejected]: (state, action) => {
            state.list.status = 'failed'
            state.list.error = action.error.message
        },

        // FETCH POST BY ID
        [fetchPost.pending]: (state, action) => {
            state.view = {
                displayName: action.meta.arg.displayName,
                urlId: action.meta.arg.urlId,
                status: 'loading',
                error: null
            }
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.view.status = 'succeeded'
            state.list.items = state.list.items.concat([action.payload])
        },
        [fetchPost.rejected]: (state, action) => {
            state.view.status = 'failed'
            state.view.error = action.error.message
        },

        // CREATE POST
        [createPost.pending]: (state, action) => {
        },
        [createPost.fulfilled]: (state, action) => {
        },
        [createPost.rejected]: (state, action) => {
        },

        // RATE POST
        [ratePost.pending]: (state, action) => {
        },
        [ratePost.fulfilled]: (state, action) => {
            const postIndex = state.list.items
                .findIndex(p => p.postId === action.payload.referenceId)
            if(postIndex !== -1){
                state.list.items[postIndex].upCount = action.payload.upCount
                state.list.items[postIndex].downCount = action.payload.downCount
            }
        },
        [ratePost.rejected]: (state, action) => {
        },
    }
})
  
export const { 
    clearPostView,
    addToPostCommentCount,
    setPostView,
    idlePostList
} = postsSlice.actions
  
export default postsSlice.reducer
