import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './sectionSlice';
import lessonReducer from './lessonSlice';

const store = configureStore({
  reducer: {
    sections: sectionReducer,
    lesson: lessonReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;