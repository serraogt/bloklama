import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requestIsleniyor: false
};

export const mockSlice = createSlice({
    name: 'mock',
    initialState,
    reducers: {
        process: (state) => {
            state.requestIsleniyor = !state.requestIsleniyor;
        },
    }
});

export const { process } = mockSlice.actions;
export default mockSlice.reducer;
