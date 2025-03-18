import { createSlice } from "@reduxjs/toolkit"

const initialState = {}

const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        setCurrentCourse(state, action) {
            return action.payload
        }
    }
})

export const { setCurrentCourse } = courseSlice.actions

export default courseSlice.reducer