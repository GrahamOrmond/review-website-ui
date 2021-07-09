import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

// setup inital state
const initialState = {
  view: {
    brandId: null,
    status: 'idle',
    error: null
  },
  list: {
    brands: [],
    status: 'idle',
    error: null
  }
}

// fetch list of brands
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async (data, { rejectWithValue }) => {
  const response = await client.get('/api/brands', rejectWithValue)
  return response.brands
})

// fetch brand by id
export const fetchBrand = createAsyncThunk('brands/fetchBrand',
async (brandId, { getState, rejectWithValue }) => {
  const brand = getBrandById(getState(), brandId)
  if(brand)
    return brand
  const response = await client.get('/api/brands/' + brandId, { rejectWithValue })
  return response
})

// get brands list info
export const getBrandsListInfo = (state) => {
  return state.brands.list;
}

// get brand view
export const getBrandView = (state) => {
  return state.brands.view
}

// get all brands
export const getAllBrands = (state) => {
  return state.brands.list.brands
}

// get brand by Id
export const getBrandById = (state, brandId) => {
  return state.brands.list.brands
    .find(brand => brand.brandId === brandId);
} 

// setup slice
export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    clearBrandView(state, action) {
      state.view = {
        brandId: null,
        status: 'idle',
        error: null
      }
    }
  },
  extraReducers: {
    // FETCH LIST OF BRANDS
    [fetchBrands.pending]: (state, action) => {
      state.list.status = 'loading'
    },
    [fetchBrands.fulfilled]: (state, action) => {
      state.list.status = 'succeeded'
      state.list.brands = action.payload;
    },
    [fetchBrands.rejected]: (state, action) => {
      state.list.status = 'failed'
      state.list.error = action.error.message
    },

    [fetchBrand.pending]: (state, action) => {
      state.view.brandId = action.meta.arg
      state.view.status = 'loading'
    },
    [fetchBrand.fulfilled]: (state, action) => {
      state.view.status = 'succeeded'
    },
    [fetchBrand.rejected]: (state, action) => {
      state.view.status = 'failed'
      state.view.error = action.error.message
    },
  }
})

export const { 
  clearBrandView,
} = brandSlice.actions

export default brandSlice.reducer
