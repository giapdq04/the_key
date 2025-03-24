import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [], // Danh sách khóa học đã đăng ký
};

const enrolledCoursesSlice = createSlice({
  name: "enrolledCourses",
  initialState,
  reducers: {
    setEnrolledCourses(state, action) {
      state.enrolledCourses = action.payload; // Cập nhật danh sách khóa học đã đăng ký
    },
  },
});

export const { setEnrolledCourses } = enrolledCoursesSlice.actions;

export default enrolledCoursesSlice.reducer;