import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu cho courses
const initialState = {
  courses: [],
  loading: false,
  error: null,
};

// Tạo slice cho courses
const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    // Action bắt đầu fetch dữ liệu
    fetchCoursesStart(state) {
      state.loading = true;
      state.error = null;
    },
    // Action khi fetch thành công
    fetchCoursesSuccess(state, action) {
      state.courses = action.payload;
      state.loading = false;
    },
    // Action khi fetch thất bại
    fetchCoursesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export các action để sử dụng trong App.js
export const { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure } = courseSlice.actions;

// Export reducer để thêm vào store
export default courseSlice.reducer;