import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  
import { client } from '../../api/client'
  
// setup inital state
const initialState = {
    productsList: {
        products: [],
        status: 'idle',
        error: null
    }
}

// fetch list of brands
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await client.get('/api/products')
    return response.products
})

export const selectProductsListInfo = (state) => {
    return state.products.productsList;
  }
  
// setup slice
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.productsList.status = 'loading'
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.productsList.status = 'succeeded'
            state.productsList.products = action.payload;
        },
        [fetchProducts.rejected]: (state, action) => {
            state.productsList.status = 'failed'
            state.productsList.error = action.error.message
        },
    }
})

  export const { 
  } = productSlice.actions
  
  export default productSlice.reducer
  