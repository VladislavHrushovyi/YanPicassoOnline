import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appSlicer";
import { adminReducer } from "./adminSlicer";

export const store = configureStore({
    reducer: {
        appReducer,
        adminReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;