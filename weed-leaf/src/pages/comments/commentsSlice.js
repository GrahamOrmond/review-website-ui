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
export const fetchComments = createAsyncThunk('comments/fetchComments',
 async (formData, { rejectWithValue }) => {
  let url = '/api/comments'
  if(formData)
      url += `?${new URLSearchParams(formData).toString()}`;
  const response = await client.get(url, rejectWithValue)
  return response.comments
})

// rate comment
export const rateComment = createAsyncThunk('comments/rateComment', 
async (formData, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .post('/api/comments/rate', rejectWithValue, formData, customConfig)
    return response
})

export const selectPostComments = (state, post) => {
  if(!post)
    return []
  return state.comments.commentsList.comments
      .filter(c => c.postId === post.postId 
        && c.commentReplyId === null);
}

export const selectCommentReplies = (state, commentId) => {
  return state.comments.commentsList.comments
      .filter(c => c.commentReplyId === commentId);
}
  
// setup slice
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
  },
  extraReducers: {
    [createComment.pending]: (state, action) => {
      state.commentsList.status = 'loading'
    },
    [createComment.fulfilled]: (state, action) => {
        state.commentsList.status = 'succeeded'
        let comments = state.commentsList.comments
        action.payload.dateCreated = action.payload.dateCreated.slice(0,-1) // remove "Z" to match other dates
        state.commentsList.comments = comments.concat([action.payload]);
    },
    [createComment.rejected]: (state, action) => {
        state.commentsList.status = 'failed'
        state.commentsList.error = action.error.message
    },
    [fetchComments.pending]: (state, action) => {
      state.commentsList.status = 'loading'
    },
    [fetchComments.fulfilled]: (state, action) => {
        state.commentsList.status = 'succeeded'
        let comments = [...state.commentsList.comments]
        // check for duplicated before adding
        action.payload.forEach(c => {
          if (comments.findIndex(comment => comment.commentId == c.commentId) === -1) comments.push(c);
        });
        state.commentsList.comments = comments
    },
    [fetchComments.rejected]: (state, action) => {
        state.commentsList.status = 'failed'
        state.commentsList.error = action.error.message
    },
    [rateComment.pending]: (state, action) => {
    },
    [rateComment.fulfilled]: (state, action) => {
        // update list with new count
        const commentIndex = state.commentsList.comments
            .findIndex(p => p.commentId === action.payload.referenceId)
        if(commentIndex != -1){ 
            let comment = {...state.commentsList.comments[commentIndex]}
            comment.upCount = action.payload.upCount
            comment.downCount = action.payload.downCount
            state.commentsList.comments[commentIndex] = comment
        }

        // update view with new count
        if(state.commentView.comment != null 
            && state.commentView.comment.commentId == action.payload.referenceId){
            state.commentView.comment.upCount = action.payload.upCount
            state.commentView.comment.downCount = action.payload.downCount
        }
    },
    [rateComment.rejected]: (state, action) => {
    },
  }
})

export const { 
} = commentsSlice.actions

export default commentsSlice.reducer
  