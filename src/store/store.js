import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './sectionSlice';
import userReducer from './userSlice';
import courseReducer from "./courseSlice"; // Slice mới tạo
const store = configureStore({
  reducer: {
    section: sectionReducer,
    user: userReducer,
    courses: courseReducer, // Reducer cho courses
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;