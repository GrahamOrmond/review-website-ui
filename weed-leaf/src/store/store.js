import { configureStore } from '@reduxjs/toolkit';

import brandsReducer from '../pages/brands/brandsSlice'

export const store = configureStore({
  reducer: {
    brands: brandsReducer
  },
});
