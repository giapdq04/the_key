import {createSlice} from "@reduxjs/toolkit";

const initialState = false

const showLoginModalSlice = createSlice({
    name: 'showLoginModal',
    initialState,
    reducers: {
        setShowLoginModal: (state, action) => {
            return action.payload
        }
    }
})

export const {setShowLoginModal} = showLoginModalSlice.actions
export default showLoginModalSlice.reducer