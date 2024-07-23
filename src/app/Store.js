import { configureStore } from "@reduxjs/toolkit";
import mockReducer from "../features/mockFeature/mockSlice";

const store = configureStore({
    reducer: {
        mock: mockReducer
    }
});

export default store;
