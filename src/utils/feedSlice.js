import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name: 'feed',
    initialState: null,
    reducers: {
        addFeed: (state, action) => {
            return action.payload
        },
        removeFeed: (state, action) => {
            return state.filter((el) => el._id !== action.payload.id)
        }
    }
})

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;