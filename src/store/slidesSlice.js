// store/slidesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const slidesSlice = createSlice({
  name: 'slides',
  initialState: {
    slides: [],
  },
  reducers: {
    setSlides: (state, action) => {
      state.slides = action.payload;
    },
  },
});

export const { setSlides } = slidesSlice.actions;
export default slidesSlice.reducer;