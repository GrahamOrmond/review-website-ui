import { configureStore } from '@reduxjs/toolkit';

import brandsReducer, { fetchBrands } from '../pages/brands/brandsSlice'

export const store = configureStore({
  reducer: {
    brands: brandsReducer
  },
});

store.dispatch(fetchBrands());
