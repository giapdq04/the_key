import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu cho courses
const initialState = []

// Tạo slice cho courses
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    
    setCourses(state, action) {
      return action.payload;
    }
  },
});

// Export các action để sử dụng trong App.js
export const { setCourses } = coursesSlice.actions;

// Export reducer để thêm vào store
export default coursesSlice.reducer;