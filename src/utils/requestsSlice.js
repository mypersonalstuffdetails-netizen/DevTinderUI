import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name: 'requests',
    initialState: null,
    reducers: {
        addRequests: (state, action) => {
            return action.payload
        },
        removeRequests: (state, action) => {
            return state.filter((el) => el._id !== action.payload.id)
        }
    }
})

export const { addRequests, removeRequests } = requestSlice.actions;
export default requestSlice.reducer