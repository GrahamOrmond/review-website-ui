import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  
import { client } from '../../api/client'
  
// setup inital state
const initialState = {
    view: {
        urlId: null,
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

// fetch list of products
export const fetchProducts = createAsyncThunk('products/fetchProducts', 
  async (fetchData, { getState, rejectWithValue }) => {
    Object.keys(fetchData).forEach(k => fetchData[k] === undefined 
            && delete fetchData[k])
    const params = new URLSearchParams(fetchData).toString()
    let url = `/api/products?${params}`;
    let response = await client.get(url, rejectWithValue)
    response.params = {
        params: params,
        timeStamp: new Date().getTime(),
        data: fetchData
    }
    // remove duplicates
    const state = getState()
    state.products.list.items.forEach(product => {
        let index = response.products.findIndex(p => p.productId === product.productId);
        if(index !== -1)
            response.products.splice(index, 1)
    })
    return response
})

// fetch product by id
export const fetchProduct = createAsyncThunk('products/fetchProduct',
async (fetchData, { rejectWithValue }) => {
    let response = await client.get(`/api/products/${fetchData.brandId}/${fetchData.productUrlId}`, { rejectWithValue })
    return response
})

export const getProductsListInfo = (state) => {
    return state.products.list;
}

export const getProductView = (state) => {
    return state.products.view
}

export const getProductById = (state, brandId, urlId) => {
    return state.products.list.items
        .find(p => p.brandId === brandId
            && p.urlId === urlId);
}

export const getProductsByBrandId = (state, brandId) => {
    return state.products.list.items
        .filter(p => p.brandId === brandId);
}

export const getProductSearchParams = (state, params) => {
    Object.keys(params).forEach(k => params[k] === undefined 
            && delete params[k])
    const paramsString = new URLSearchParams(params).toString()
    return state.products.list.params
    .find(p => p.params === paramsString);
}
  
// setup slice
export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductView(state, action) {
            state.view = {
                urlId: null,
                brandId: null,
                status: 'idle',
                error: null
            }
        },
        setProductView(state, action) {
            state.view = {
                urlId: action.payload.productUrlId,
                brandId: action.payload.brandId,
                status: 'succeeded',
                error: null
            }
        },
        idleProductList(state, action) {
            state.list.status = 'idle'
        }
    },
    extraReducers: {
        // FETCH LIST OF PRODUCTS
        [fetchProducts.pending]: (state, action) => {
            state.list.status = 'loading'
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.list = {
                status: 'succeeded',
                params: state.list.params.concat([action.payload.params]),
                items: state.list.items.concat(action.payload.products),
                error: null
            }
        },
        [fetchProducts.rejected]: (state, action) => {
            state.list.status = 'failed'
            state.list.error = action.error.message
        },

        // FETCH PRODUCT BY URL ID
        [fetchProduct.pending]: (state, action) => {
            state.view = {
                urlId: action.meta.arg.productUrlId,
                brandId: action.meta.arg.brandId,
                status: 'loading',
                error: null
            }
        },
        [fetchProduct.fulfilled]: (state, action) => {
            let product = {...action.payload}
            state.list.items = state.list.items.concat(product)
            state.view.status = 'succeeded'
        },
        [fetchProduct.rejected]: (state, action) => {
            state.view.status = 'failed'
            state.view.error = action.error.message
        },
    }
})

  export const { 
    clearProductView,
    setProductView,
    idleProductList
  } = productSlice.actions
  
  export default productSlice.reducer
  