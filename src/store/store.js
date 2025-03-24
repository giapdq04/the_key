import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './sectionSlice';
import userReducer from './userSlice';
import courseReducer from "./courseSlice";
import coursesReducer from "./coursesSlice";
import selectedLessonReducer from "./selectedLessonSlice";
import courseListMobile from "./CourseListMobileSlice";
import { configureStore } from '@reduxjs/toolkit';
import sectionReducer from './sectionSlice';
import userReducer from './userSlice';
import courseReducer from './courseSlice';
import coursesReducer from './coursesSlice';
import selectedLessonReducer from './selectedLessonSlice';
import enrolledCoursesReducer from './enrolledCoursesSlice';
import slidesReducer from './slidesSlice';

const store = configureStore({
  reducer: {
    section: sectionReducer,
    user: userReducer,
    courses: coursesReducer,
    currentCourse: courseReducer,
    selectedLesson: selectedLessonReducer,
    courseListMobile: courseListMobile,
    enrolledCourses: enrolledCoursesReducer,
    slides: slidesReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;