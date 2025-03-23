import {createSlice} from "@reduxjs/toolkit";

const initialState = false

const CourseListMobileSlice = createSlice({
    name: 'courseListMobile',
    initialState,
    reducers: {
        toggleCourseListMobile(state) {
            return !state
        }
    }
})

export const {toggleCourseListMobile} = CourseListMobileSlice.actions
export default CourseListMobileSlice.reducer