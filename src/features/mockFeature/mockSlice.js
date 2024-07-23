import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requestIsleniyor: false,
    time: 5
};

export const mockSlice = createSlice({
    name: 'mock',
    initialState,
    reducers: {
        process: (state) => {
            state.requestIsleniyor = !state.requestIsleniyor;
        },
        setTime: (state, action ) => {
            state.time = action.payload;
        }
    }
});

export const { process , setTime} = mockSlice.actions;
export default mockSlice.reducer;
