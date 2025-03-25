import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import courseReducer from "./courseSlice";
import coursesReducer from "./coursesSlice";
import selectedLessonReducer from "./selectedLessonSlice";
import enrolledCoursesReducer from './enrolledCoursesSlice';
import slidesReducer from './slidesSlice';
import showLoginModalReducer from './showLoginModal';

const store = configureStore({
  reducer: {
    user: userReducer,
    courses: coursesReducer,
    currentCourse: courseReducer,
    selectedLesson: selectedLessonReducer,
    enrolledCourses: enrolledCoursesReducer,
    slides: slidesReducer,
    showLoginModal: showLoginModalReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;