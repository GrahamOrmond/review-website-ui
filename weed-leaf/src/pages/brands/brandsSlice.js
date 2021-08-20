import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'
import { sortListByName } from '../../helpers/generalHelper'

// setup inital state
const initialState = {
  view: {
    brandId: null,
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

// fetch list of brands
export const fetchBrands = createAsyncThunk('brands/fetchBrands', 
  async (fetchData, { getState, rejectWithValue }) => {
  Object.keys(fetchData).forEach(k => fetchData[k] === undefined 
    && delete fetchData[k])
  const params = new URLSearchParams(fetchData).toString()
  let url = `/api/brands?${params}`;
  let response = await client.get(url, rejectWithValue)
  response.params = {
    params: params,
    timeStamp: new Date().getTime(),
    data: fetchData
  }
  // remove duplicates
  const state = getState()
  state.brands.list.items.forEach(brand => {
    let index = response.brands.findIndex(b => b.brandId === brand.brandId);
    if(index !== -1)
        response.brands.splice(index, 1)
  })

  response.brands = sortListByName(response.brands, "name") // sort brands before saving
  return response
})

// fetch brand by id
export const fetchBrand = createAsyncThunk('brands/fetchBrand',
async (brandId, { rejectWithValue }) => {
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
  return state.brands.list.items
}

// get brand by Id
export const getBrandById = (state, brandId) => {
  return state.brands.list.items
    .find(brand => brand.brandId === brandId);
} 

export const getBrandsSearchParams = (state, params) => {
  Object.keys(params).forEach(k => params[k] === undefined 
    && delete params[k])
  const paramsString = new URLSearchParams(params).toString()
  return state.brands.list.params
  .find(p => p.params === paramsString);
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
    },
    setBrandView(state, action) {
      state.view = {
        brandId: action.payload.brandId,
        status: 'succeeded',
            error: null
        }
    },
    idleBrandsList(state, action) {
      state.list.status = "idle"
    }
  },
  extraReducers: {
    // FETCH LIST OF BRANDS
    [fetchBrands.pending]: (state, action) => {
      state.list.status = 'loading'
    },
    [fetchBrands.fulfilled]: (state, action) => {
      state.list = {
        status: 'succeeded',
        params: state.list.params.concat([action.payload.params]),
        items: state.list.items.concat(action.payload.brands),
        error: null
      }
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
      state.list.items = state.list.items.concat([action.payload])
    },
    [fetchBrand.rejected]: (state, action) => {
      state.view.status = 'failed'
      state.view.error = action.error.message
    },
  }
})

export const { 
  clearBrandView,
  setBrandView,
  idleBrandsList,
} = brandSlice.actions

export default brandSlice.reducer
