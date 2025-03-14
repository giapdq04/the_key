import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './sectionSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    section: sectionReducer,
    user: userReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;