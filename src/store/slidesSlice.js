// store/slidesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const slidesSlice = createSlice({
  name: 'slides',
  initialState: [],
  reducers: {
    setSlides: (state, action) => {
      return action.payload;
    },
  },
});

export const { setSlides } = slidesSlice.actions;
export default slidesSlice.reducer;