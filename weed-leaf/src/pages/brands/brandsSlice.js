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

// fetch list of brands
export const fetchBrands = createAsyncThunk('brands/fetchBrands', async () => {
  const response = await client.get('/api/brands')
  return response.brands
})

// fetch brand by id
export const fetchBrand = createAsyncThunk('brands/fetchBrand',
async (brandId, { getState }) => {
  const brand = selectBrandById(getState(), brandId)
  if(brand)
    return brand
  const response = await client.get('/api/brands/' + brandId)
  return response
})

export const selectBrandsListInfo = (state) => {
  return state.brands.brandsList;
}

export const selectBrandView = (state) => {
  return state.brands.brandView
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
      state.brandView.status = 'succeeded'
      state.brandView.brand = action.payload;
    },
    [fetchBrand.rejected]: (state, action) => {
      state.brandView.status = 'failed'
      state.brandView.error = action.error.message
    },
  }
})

export const { 
  clearBrandView,
} = brandSlice.actions

export default brandSlice.reducer
