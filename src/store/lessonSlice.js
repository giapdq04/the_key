import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeLesson: null,
  video: '7kVBp2B2N5M',
  title: '',
  updatedAt: '',
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setActiveLesson: (state, action) => {
      state.activeLesson = action.payload.id;
      state.video = action.payload.ytbVideoId;
      state.title = action.payload.title;
      state.updatedAt = new Date(action.payload.updatedAt).toLocaleDateString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    },
  },
});

export const { setActiveLesson } = lessonSlice.actions;
export default lessonSlice.reducer;