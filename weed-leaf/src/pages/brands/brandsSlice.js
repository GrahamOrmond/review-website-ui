import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

// setup inital state
const initialState = {
  brandView: {
    brand: null,
    status: 'idle',
    error: null
  },
  brandsList: {
    brands: [],
    status: 'idle',
    error: null
  }
}

const postState = {
  posts: null,
  status: 'idle',
  error: null
}

// fetch list of brands
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async (data, { rejectWithValue }) => {
  const response = await client.get('/api/brands', rejectWithValue)
  return response.brands
})

// fetch brand by id
export const fetchBrand = createAsyncThunk('brands/fetchBrand',
async (brandId, { getState, rejectWithValue }) => {
  const brand = selectBrandById(getState(), brandId)
  if(brand)
    return brand
  const response = await client.get('/api/brands/' + brandId, { rejectWithValue })
  return response
})

// fetch brand posts
export const fetchBrandPosts = createAsyncThunk('brands/fetchBrandPosts',
async (fetchData, { getState, rejectWithValue }) => {
  let url = `/api/posts?${new URLSearchParams(fetchData).toString()}`;
  const response = await client.get(url, { rejectWithValue })
  return response
})

export const selectBrandsListInfo = (state) => {
  return state.brands.brandsList;
}

export const selectBrandView = (state) => {
  return state.brands.brandView
}

export const selectAllBrands = (state) => {
  return state.brands.brandsList.brands
}

export const selectBrandById = (state, brandId) => {
  return state.brands.brandsList.brands
    .find(brand => brand.brandId === brandId);
} 

// setup slice
export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearBrandView(state, action) {
      state.brandView = {
        brand: null,
        status: 'idle',
        error: null
      }
    }
  },
  extraReducers: {
    [fetchBrands.pending]: (state, action) => {
      state.brandsList.status = 'loading'
    },
    [fetchBrands.fulfilled]: (state, action) => {
      state.brandsList.status = 'succeeded'
      state.brandsList.brands = action.payload;
    },
    [fetchBrands.rejected]: (state, action) => {
      state.brandsList.status = 'failed'
      state.brandsList.error = action.error.message
    },
    [fetchBrand.pending]: (state, action) => {
      state.brandView.status = 'loading'
    },
    [fetchBrand.fulfilled]: (state, action) => {
      let brand = {...action.payload}
      brand.reviews = postState
      brand.questions = postState
      brand.threads = postState

      state.brandView.brand = brand;
      state.brandView.status = 'succeeded'
    },
    [fetchBrand.rejected]: (state, action) => {
      state.brandView.status = 'failed'
      state.brandView.error = action.error.message
    },
    [fetchBrandPosts.pending]: (state, action) => {
      state.brandView.brand[action.meta.arg.type].status = 'loading'
    },
    [fetchBrandPosts.fulfilled]: (state, action) => {
        let setPayload = {
            posts: action.payload.posts,
            status: 'succeeded',
            error: null
        }
        state.brandView.brand[action.meta.arg.type] = setPayload
    },
    [fetchBrandPosts.rejected]: (state, action) => {
        state.brandView.brand[action.meta.arg.type].status = 'failed'
        state.brandView.brand[action.meta.arg.type].error = action.error.message
    },
  }
})

export const { 
  clearBrandView,
} = brandSlice.actions

export default brandSlice.reducer
