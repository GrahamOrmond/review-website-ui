import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  
  import { client } from '../../api/client'
import { getOauthToken } from '../oauth/oauthSlice'


// fetch list of brands
export const createComment = createAsyncThunk('comments/createComment',
 async (data, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .post('/api/posts/', rejectWithValue, data, customConfig)
    return response
})
  
  // setup inital state
  const initialState = {
    commmentView: {
      comment: null,
      status: 'idle',
      error: null
    },
    commmentsList: {
      comments: [],
      status: 'idle',
      error: null
    }
  }
  
  const postState = {
    posts: null,
    status: 'idle',
    error: null
  }
  
  // setup slice
  export const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
    },
    extraReducers: {
    }
  })
  
  export const { 
  } = commentsSlice.actions
  
  export default commentsSlice.reducer
  