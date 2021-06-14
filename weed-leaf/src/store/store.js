import { configureStore } from '@reduxjs/toolkit';

import oauthReducer from '../pages/oauth/oauthSlice'
import usersReducer from '../pages/users/usersSlice'
import brandsReducer from '../pages/brands/brandsSlice'
import productsReducer from '../pages/products/productsSlice'
import postsReducer from '../pages/posts/postsSlice'

export const store = configureStore({
  reducer: {
    oauth: oauthReducer,
    users: usersReducer,
    brands: brandsReducer,
    products: productsReducer,
    posts: postsReducer,
  },
});
