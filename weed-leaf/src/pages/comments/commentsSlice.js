import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  
import { client } from '../../api/client'
import { getOauthToken } from '../oauth/oauthSlice'

// setup inital state
const initialState = {
  commentView: {
    comment: null,
    status: 'idle',
    error: null
  },
  commentsList: {
    comments: [],
    status: 'idle',
    error: null
  }
}

// fetch list of brands
export const createComment = createAsyncThunk('comments/createComment',
 async (data, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .post('/api/comments/', rejectWithValue, data, customConfig)
    return response
})

// fetch post
export const fetchComments = createAsyncThunk('posts/fetchComments',
 async (formData, { rejectWithValue }) => {
  let url = '/api/comments'
  if(formData)
      url += `?${new URLSearchParams(formData).toString()}`;
  const response = await client.get(url, rejectWithValue)
  return response.comments
})

export const selectPostComments = (state, post ) => {
  if(!post)
    return []
  return state.comments.commentsList.comments
      .filter(c => c.postId === post.postId);
}
  
// setup slice
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchComments.pending]: (state, action) => {
      state.commentsList.status = 'loading'
    },
    [fetchComments.fulfilled]: (state, action) => {
        state.commentsList.status = 'succeeded'
        let comments = [...state.commentsList.comments]
        state.commentsList.comments = comments.concat(action.payload);
    },
    [fetchComments.rejected]: (state, action) => {
        state.commentsList.status = 'failed'
        state.commentsList.error = action.error.message
    },
  }
})

export const { 
} = commentsSlice.actions

export default commentsSlice.reducer
  