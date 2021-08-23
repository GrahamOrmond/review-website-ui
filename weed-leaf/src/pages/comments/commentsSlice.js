import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  
import { client } from '../../api/client'
import { getAccessToken } from '../oauth/oauthSlice'

// setup inital state
const initialState = {
  view: {
    commentId: null,
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

// create comment
export const createComment = createAsyncThunk('comments/createComment',
 async (data, { getState, rejectWithValue }) => {
    const token = getAccessToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await client
        .post('/api/comments/', rejectWithValue, data, customConfig)
    return response
})

// update comment by Id
export const updateComment = createAsyncThunk('comments/updateComment',
 async (data, { getState, rejectWithValue }) => {
    const token = getAccessToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await client
        .update(`/api/comments/${data.commentId}`, rejectWithValue, data, customConfig)
    return response
})

// fetch post
export const fetchComments = createAsyncThunk('comments/fetchComments',
 async (fetchData, { getState, rejectWithValue }) => {
  Object.keys(fetchData).forEach(k => fetchData[k] === undefined 
    && delete fetchData[k])
  const params = new URLSearchParams(fetchData).toString()
  let url = `/api/comments?${params}`;
  let response = await client.get(url, rejectWithValue)
  response.params = {
    params: params,
    timeStamp: new Date().getTime(),
    data: fetchData
  }
  // remove duplicates
  const state = getState()
  state.comments.list.items.forEach(comment => {
    let index = response.comments.findIndex(c => c.commentId === comment.commentId);
    if(index !== -1)
        response.comments.splice(index, 1)
  })
  return response
})

// rate comment
export const rateComment = createAsyncThunk('comments/rateComment', 
async (formData, { getState, rejectWithValue }) => {
    const token = getAccessToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token}`
    }
    const response = await client
        .post('/api/comments/rate', rejectWithValue, formData, customConfig)
    return response
})

export const getCommentsView = (state, commentId) => {
  return state.comments.list.items
      .filter(c => c.commentReplyId === commentId);
}

export const getCommentsByPost = (state, post) => {
  if(!post)
    return []
  return state.comments.list.items
      .filter(c => c.postId === post.postId 
        && c.commentReplyId === null);
}

export const selectCommentReplies = (state, commentId) => {
  return state.comments.list.items
      .filter(c => c.commentReplyId === commentId);
}

export const getCommentsSearchParams = (state, params) => {
  Object.keys(params).forEach(k => params[k] === undefined 
    && delete params[k])
  const paramsString = new URLSearchParams(params).toString()
  return state.comments.list.params
  .find(c => c.params === paramsString);
} 
  
// setup slice
export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    idleCommentsList(state, action) {
      state.list.status = "idle"
    }
  },
  extraReducers: {
    // CREATE COMMMENT
    [createComment.pending]: (state, action) => {
      state.list.status = 'loading'
      state.list.error = null
    },
    [createComment.fulfilled]: (state, action) => {
        action.payload.dateCreated = action.payload.dateCreated.slice(0,-1) // remove "Z" to match other dates
        state.list.status = 'succeeded'
        state.list.items = state.list.items.concat([action.payload]);
        if(action.payload.commentReplyId){
          let index = state.list.items
            .findIndex(c => c.commentId === action.payload.commentReplyId);
          if(index !== -1)
            state.list.items[index].replyCount += 1
        }
    },
    [createComment.rejected]: (state, action) => {
        state.list.status = 'failed'
        state.list.error = action.error.message
    },

    // UPDATE COMMENT
    [updateComment.pending]: (state, action) => {
    },
    [updateComment.fulfilled]: (state, action) => {
      const updatedComment = action.payload
      // check for update comment in state
      let commentsList = [...state.list.items]
      let index = commentsList
          .findIndex(c => c.commentId === updatedComment.commentId);

      // update state
      if(index !== -1){ // comment found
        state.list.items[index].content = updatedComment.content
        state.list.items[index].dateUpdated = updatedComment.dateUpdated
      }
      
    },
    [updateComment.rejected]: (state, action) => {
    },

    

    // FETCH COMMENTS
    [fetchComments.pending]: (state, action) => {
      state.list.status = 'loading'
      state.list.error = null
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.list = {
        status: 'succeeded',
        params: state.list.params.concat([action.payload.params]),
        items: state.list.items.concat(action.payload.comments),
        error: null
      }
    },
    [fetchComments.rejected]: (state, action) => {
        state.list.status = 'failed'
        state.list.error = action.error.message
    },

    // RATE COMMENT
    [rateComment.pending]: (state, action) => {
    },
    [rateComment.fulfilled]: (state, action) => {
        // update list with new count
        const commentIndex = state.list.items
            .findIndex(c => c.commentId === action.payload.referenceId)
        if(commentIndex !== -1){ 
            state.list.items[commentIndex].upCount = action.payload.upCount
            state.list.items[commentIndex].downCount = action.payload.downCount
        }
    },
    [rateComment.rejected]: (state, action) => {
    },
  }
})

// export const { 
// } = commentsSlice.actions

export default commentsSlice.reducer
  