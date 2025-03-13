import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            return action.payload;
        }
    }
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;