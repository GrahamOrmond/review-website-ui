
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { getAccessToken } from '../oauth/oauthSlice'
import { client } from '../../api/client'

// setup inital state
const initialState = {
    view: {
        displayName: null,
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

// fetch images
export const fetchImages = createAsyncThunk('images/fetchImages', 
async (formData, { getState, rejectWithValue }) => {
    const state = getState()
    const token = getAccessToken(state)
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token}`
    }

    Object.keys(formData).forEach(k => formData[k] === undefined 
        && delete formData[k])
    const params = new URLSearchParams(formData).toString()
    let url = `/api/images?${params}`;
    let response = await client.get(url, rejectWithValue, customConfig)
    response.params = {
        params: params,
        timeStamp: new Date().getTime(),
        data: formData
    }
    // remove duplicates

    
    
    state.images.list.items.forEach(image => {
    let index = response.images.findIndex(p => p.fileId === image.fileId);
    if(index !== -1)
        response.images.splice(index, 1)
    })
    return response
})

export const getImagesList = (state) => {
    return state.images.list;
}

export const getImagesByDisplayName = (state, displayName) => {
    return state.images.list.items
        .find(p => p.displayName.toLowerCase() === displayName.toLowerCase());
} 

export const getImagesSearchParams = (state, params) => {
    Object.keys(params).forEach(k => params[k] === undefined 
      && delete params[k])
    const paramsString = new URLSearchParams(params).toString()
    return state.images.list.params
        .find(p => p.params.toLowerCase() === paramsString.toLowerCase());
} 

// setup slice
export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {
        idleImagesList(state, action) {
            state.list.status = 'idle'
        },
    },
    extraReducers: {
       // FETCH LIST OF IMAGES
       [fetchImages.pending]: (state, action) => {
            state.list.status = 'loading'
            state.list.error = null
        },
        [fetchImages.fulfilled]: (state, action) => {
            state.list = {
                params: state.list.params.concat([action.payload.params]),
                items: state.list.items.concat(action.payload.images),
                status: 'succeeded',
                error: null
            }
        },
        [fetchImages.rejected]: (state, action) => {
            state.list.status = 'failed'
            state.list.error = action.error.message
        },
    }
})
  
export const { 
    idleImagesList,
} = imagesSlice.actions
  
export default imagesSlice.reducer
