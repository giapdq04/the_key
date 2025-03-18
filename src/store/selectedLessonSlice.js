import {createSlice} from "@reduxjs/toolkit";

const initialState = null

const selectedLessonSlice = createSlice({
    name: 'selectedLesson',
    initialState,
    reducers: {
        setSelectedLesson: (state, action) => {
            return action.payload
        }
    }
})

const {actions, reducer} = selectedLessonSlice
export const {setSelectedLesson} = actions
export default reducer