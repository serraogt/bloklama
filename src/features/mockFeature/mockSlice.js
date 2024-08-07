import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    requestIsleniyor: false,
    time: 0
};

export const mockSlice = createSlice({
    name: 'mock',
    initialState,
    reducers: {
        process: (state) => {
            state.requestIsleniyor = !state.requestIsleniyor;
            console.log("şu anda bir request işleniyor mu: " + state.requestIsleniyor)
        },
        setTime: (state, action ) => {
            state.time = action.payload;
        },
        setFalse: (state) => {
            state.requestIsleniyor = false;
            console.log("şu anda bir request işleniyor mu: " + state.requestIsleniyor)
        },
        setTrue: (state) => {
            state.requestIsleniyor = true;
            console.log("şu anda bir request işleniyor mu: " + state.requestIsleniyor)
        }
    }
});

export const { process , setTime, setFalse, setTrue} = mockSlice.actions;
export default mockSlice.reducer;
