import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './sectionSlice';
import userReducer from './userSlice';
import courseReducer from "./courseSlice";
import coursesReducer from "./coursesSlice";
import selectedLessonReducer from "./selectedLessonSlice";
const store = configureStore({
  reducer: {
    section: sectionReducer,
    user: userReducer,
    courses: coursesReducer,
    currentCourse: courseReducer,
    selectedLesson: selectedLessonReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;