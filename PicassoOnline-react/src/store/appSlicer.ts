import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../connector/types/responseTypes"

interface AppState {
    drawboardName: string,
    activeUsers: User[]
}

const initialState = {
    drawboardName: ""
} as AppState

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setDrawboardName: (state, action: PayloadAction<string>) => {
            state.drawboardName = action.payload
        },
        setActiveUsers: (state, action: PayloadAction<User[]>) => {
            state.activeUsers = action.payload
        }
    }
})

export const {setDrawboardName, setActiveUsers} = appSlice.actions

export const appReducer =  appSlice.reducer;