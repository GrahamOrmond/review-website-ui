import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

// setup inital state
const initialState = {
    userInfo: { // tracks logged in user
        user: null,
        status: 'idle',
        error: null
    },
    tokenInfo: { // holds user oauth token
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
    return state.oauth.tokenInfo.isLoggedIn
}

export const getCurrentUser = (state) => {
    return state.oauth.userInfo.user
}

export const getOauthToken = (state) => {
    return state.oauth.tokenInfo.token
}
  
// setup slice
export const oauthSlice = createSlice({
    name: 'oauth',
    initialState,
    reducers: {
        logoutUser(state, action) {
            window.localStorage.removeItem("session");
            state = {...initialState}
        }
    },
    extraReducers: {
        // LOGIN USER
        [loginUser.pending]: (state, action) => {
            state.tokenInfo.status = 'loading'
            state.tokenInfo.error = null
        },
        [loginUser.fulfilled]: (state, action) => {
            state.tokenInfo = {
                isLoggedIn: true,
                token: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [loginUser.rejected]: (state, action) => {
            state.tokenInfo = {
                isLoggedIn: false,
                token: null,
                status: 'failed',
                error: action.error.message
            }
        },

        // REGISTER USER
        [registerUser.pending]: (state, action) => {
            state.tokenInfo.status = 'loading'
            state.tokenInfo.error = null
        },
        [registerUser.fulfilled]: (state, action) => {
            state.tokenInfo = {
                isLoggedIn: true,
                token: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [registerUser.rejected]: (state, action) => {
            state.tokenInfo = {
                isLoggedIn: false,
                token: null,
                status: 'failed',
                error: action.error.message
            }
        },

        // CHECK USER LOGIN
        [checkLogin.pending]: (state, action) => {
            state.tokenInfo.status = 'loading'
            state.tokenInfo.error = null
        },
        [checkLogin.fulfilled]: (state, action) => {
            state.tokenInfo = {
                isLoggedIn: true,
                token: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [checkLogin.rejected]: (state, action) => {
            state.tokenInfo = {
                isLoggedIn: false,
                token: null,
                status: 'failed',
                error: action.error.message
            }
        },

        // SET CURRENT USER INFO
        [fetchCurrentUser.pending]: (state, action) => {
            state.userInfo.status = 'loading'
            state.userInfo.error = null
        },
        [fetchCurrentUser.fulfilled]: (state, action) => {
            state.userInfo = {
                user: action.payload,
                status: 'succeeded',
                error: null
            }
        },
        [fetchCurrentUser.rejected]: (state, action) => {
            state.userInfo = {
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
