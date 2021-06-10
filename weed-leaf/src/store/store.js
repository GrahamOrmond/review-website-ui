import { configureStore } from '@reduxjs/toolkit';

import brandsReducer from '../pages/brands/brandsSlice'
import productsReducer from '../pages/products/productsSlice'

export const store = configureStore({
  reducer: {
    brands: brandsReducer,
    products: productsReducer
  },
});
