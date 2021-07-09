import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

// setup inital state
const initialState = {
    identity: { // tracks logged in user
        user: null,
        status: 'idle',
        error: null
    },
    access: { // holds user oauth token
        isLoggedIn: false,
        token: null,
        status: 'idle',
        error: null
    },
}

// check user login
export const checkLogin = createAsyncThunk('oauth/checkLogin', async (data, { rejectWithValue }) => {
    const tokenString = window.localStorage.getItem('session');
    if(!tokenString)
        return rejectWithValue("No Token");

    const token = JSON.parse(tokenString);
    if(new Date().getTime() > new Date(token.expiration).getTime())
        return rejectWithValue("Token Expired");
    return token;
})

// user login
export const loginUser = createAsyncThunk('oauth/login', async (formData, { rejectWithValue }) => {
    const response = await client.post('/api/account/login', rejectWithValue, formData)
    window.localStorage.setItem('session', JSON.stringify(response));
    return response
})

// user sign up
export const registerUser = createAsyncThunk('oauth/register', async (formData, { rejectWithValue }) => {
    const response = await client.post('/api/account/register', rejectWithValue, formData)
    return response
})

// fetch current user
export const fetchCurrentUser = createAsyncThunk('users/fetchCurrent', async (formData, { getState, rejectWithValue }) => {
    const token = getOauthToken(getState())
    let customConfig = {}
    customConfig.headers = {
        'Authorization': `Bearer ${token.token}`
    }
    const response = await client
        .get('/api/profile/', rejectWithValue, customConfig)
    return response
})

export const isUserLoggedIn = (state) => {
    return state.oauth.access.isLoggedIn
}

export const getCurrentUser = (state) => {
    return state.oauth.identity.user
}

export const getOauthToken = (state) => {
    return state.oauth.access.token
}
  
// setup slice
export const oauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
        logoutUser(state, action) {
            window.localStorage.removeItem("session");
            state.identity = {...initialState.identity}
            state.access = {...initialState.access}
        }
    },
    extraReducers: {
        // LOGIN USER
        [loginUser.pending]: (state, action) => {
            state.access.status = 'loading'
            state.access.error = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.access = {
                isLoggedIn: true,
                token: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [loginUser.rejected]: (state, action) => {
            state.access = {
                isLoggedIn: false,
                token: null,
                status: 'failed',
                error: action.error.message
            }
        },

        // REGISTER USER
        [registerUser.pending]: (state, action) => {
            state.access.status = 'loading'
            state.access.error = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.access = {
                isLoggedIn: true,
                token: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [registerUser.rejected]: (state, action) => {
            state.access = {
                isLoggedIn: false,
                token: null,
                status: 'failed',
                error: action.error.message
            }
        },

        // CHECK USER LOGIN
        [checkLogin.pending]: (state, action) => {
            state.access.status = 'loading'
            state.access.error = null
        },
        [checkLogin.fulfilled]: (state, action) => {
            state.access = {
                isLoggedIn: true,
                token: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [checkLogin.rejected]: (state, action) => {
            state.access = {
                isLoggedIn: false,
                token: null,
                status: 'failed',
                error: action.error.message
            }
        },

        // SET CURRENT USER INFO
        [fetchCurrentUser.pending]: (state, action) => {
            state.identity.status = 'loading'
            state.identity.error = null
        },
        [fetchCurrentUser.fulfilled]: (state, action) => {
            state.identity = {
                user: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [fetchCurrentUser.rejected]: (state, action) => {
            state.identity = {
                user: null,
                status: 'failed',
                error: action.error.message
            }
        },

    }
})
  
export const { 
    logoutUser,
} = oauthSlice.actions
  
export default oauthSlice.reducer
