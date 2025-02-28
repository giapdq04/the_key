import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './sectionSlice';

const store = configureStore({
  reducer: {
    section: sectionReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;