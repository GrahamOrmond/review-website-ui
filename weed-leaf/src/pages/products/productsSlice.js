import {
    createSlice,
    createAsyncThunk,
  } from '@reduxjs/toolkit'
  
import { client } from '../../api/client'
  
// setup inital state
const initialState = {
    view: { // single product loaded view 
        urlId: null, // product url Id
        brandId: null, // product brandId
        status: 'idle', // status of product being loaded
        error: null // any errors that occurred
    },
    list: { // list of all products loaded
        params: [], // tracks search params used to load the list
        items: [], // list of all items loaded
        status: 'idle', // status of loaded items
        error: null // track any errors
    },
    filter: { // filter options used to sort products
        filters: [], // list of filters
        status: 'idle', // status of loaded filters
        error: null // track any errors
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

// fetch product filter options used to sort product list
// used to load the filter options to the product state, that populates the list filter options
export const fetchProductFilters = createAsyncThunk('products/fetchProductFilters',
async (fetchData, { rejectWithValue }) => {
    let response = await client.get(`/api/products/filters`, { rejectWithValue })
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

// get a list of products by filter
// used to return a list of products filtered by product filter
export const getProductsByFilter = (state, filter) => {
    let items = state.products.list.items;
    
    if(filter.brands.length > 0 ){ // filter by brands
        items = items.filter(p => filter.brands.includes(p.brandId))
    }

    if(filter.productType.length > 0 ){ // filter by type
        items = items.filter(p => filter.productType.includes(p.type))
    }

    if(filter.category.length > 0 ){ // filter by category
        items = items.filter(p => filter.category.includes(p.category))
    }
    return items
}

// get loaded product filter option info
// ** used to populate the filter options when displaying a list of products **
export const getProductFilterInfo = (state) => {
    return state.products.filter
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
        },
        clearProductParams(state, action) {
            state.list.status = 'idle'
            state.list.params = []
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

        // FETCH PRODUCT FILTERS
        [fetchProductFilters.pending]: (state, action) => {
            state.filter = {
                filters: [],
                status: 'loading',
                error: null
            }
        },
        [fetchProductFilters.fulfilled]: (state, action) => {
            let filtersList = [...action.payload]
            state.filter = {
                filters: filtersList,
                status: 'succeeded',
                error: null
            }
        },
        [fetchProductFilters.rejected]: (state, action) => {
            state.filter.status = 'failed'
            state.filter.error = action.error.message
        },
    }
})

  export const { 
    clearProductView,
    setProductView,
    idleProductList,
    clearProductParams
  } = productSlice.actions
  
  export default productSlice.reducer
  