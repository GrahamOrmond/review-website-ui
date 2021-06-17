import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  
import { client } from '../../api/client'
  
// setup inital state
const initialState = {
    productView: {
        product: null,
        status: 'idle',
        error: null
    },
    productsList: {
        products: [],
        status: 'idle',
        error: null
    }
}

const postState = {
    posts: null,
    status: 'idle',
    error: null
}


// fetch list of products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (data, { rejectWithValue }) => {
    const response = await client.get('/api/products', rejectWithValue)
    return response.products
})

// fetch product by id
export const fetchProduct = createAsyncThunk('products/fetchProduct',
async (fetchData, { getState, rejectWithValue }) => {
  const product = selectProductById(getState(), fetchData)
  if(product)
    return product
  const response = await client.get(`/api/products/${fetchData.brandId}/${fetchData.productUrlId}`, { rejectWithValue })
  return response
})

// fetch product by id
export const fetchProductPosts = createAsyncThunk('products/fetchProductPosts',
async (fetchData, { getState, rejectWithValue }) => {
  let url = `/api/posts?${new URLSearchParams(fetchData).toString()}`;
  const response = await client.get(url, { rejectWithValue })
  return response
})

export const selectProductsListInfo = (state) => {
    return state.products.productsList;
}

export const selectProductView = (state) => {
    return state.products.productView
}

export const selectProductById = (state, productInfo) => {
    return state.products.productsList.products
        .find(product => product.brandId === productInfo.brandId
            && product.urlId === productInfo.productUrlId);
}
  
// setup slice
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductView(state, action) {
            state.productView = {
                product: null,
                status: 'idle',
                error: null
            }
        }
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
        [fetchProduct.pending]: (state, action) => {
            state.productView.status = 'loading'
        },
        [fetchProduct.fulfilled]: (state, action) => {
            let product = {...action.payload}
            product.reviews = postState
            product.questions = postState
            product.threads = postState

            state.productView.product = product;
            state.productView.status = 'succeeded'
        },
        [fetchProduct.rejected]: (state, action) => {
            state.productView.status = 'failed'
            state.productView.error = action.error.message
        },
        [fetchProductPosts.pending]: (state, action) => {
            state.productView.product[action.meta.arg.type].status = 'loading'
        },
        [fetchProductPosts.fulfilled]: (state, action) => {
            let setPayload = {
                posts: action.payload.posts,
                status: 'succeeded',
                error: null
            }
            state.productView.product[action.meta.arg.type] = setPayload
        },
        [fetchProductPosts.rejected]: (state, action) => {
            state.productView.product[action.meta.arg.type].status = 'failed'
            state.productView.product[action.meta.arg.type].error = action.error.message
        },
    }
})

  export const { 
    clearProductView,
  } = productSlice.actions
  
  export default productSlice.reducer
  