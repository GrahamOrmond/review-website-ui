import { configureStore } from '@reduxjs/toolkit';

import oauthReducer from '../pages/oauth/oauthSlice'
import usersReducer from '../pages/users/usersSlice'
import brandsReducer from '../pages/brands/brandsSlice'
import productsReducer from '../pages/products/productsSlice'
import postsReducer from '../pages/posts/postsSlice'
import commentsReducer from '../pages/comments/commentsSlice'
import imagesReducer from '../pages/images/imagesSlice'

export const store = configureStore({
  reducer: {
    oauth: oauthReducer,
    users: usersReducer,
    brands: brandsReducer,
    products: productsReducer,
    posts: postsReducer,
    comments: commentsReducer,
    images: imagesReducer,
  },
});
