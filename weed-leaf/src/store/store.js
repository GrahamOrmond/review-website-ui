import { configureStore } from '@reduxjs/toolkit';

import oauthReducer from '../pages/oauth/oauthSlice'
import brandsReducer from '../pages/brands/brandsSlice'
import productsReducer from '../pages/products/productsSlice'

export const store = configureStore({
  reducer: {
    oauth: oauthReducer,
    brands: brandsReducer,
    products: productsReducer
  },
});
