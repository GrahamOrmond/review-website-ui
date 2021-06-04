import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

// setup inital state
const initialState = {
  brands: [],
  status: 'idle',
  error: null
}

// fetch list of brands
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const response = await client.get('/api/brands')
  return response.brands
})

export const selectAllBrands = state => state.brands

export const selectBrandById = (state, brandId) => {
  return state.brands.brands.find(brand => brand.brandId === brandId);
} 

// setup slice
export const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchBrands.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchBrands.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.brands = action.payload;
    },
    [fetchBrands.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

export const { } = brandSlice.actions

export default brandSlice.reducer
