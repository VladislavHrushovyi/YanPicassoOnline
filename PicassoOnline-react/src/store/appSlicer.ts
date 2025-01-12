import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CreationInfo, User } from "../connector/types/responseTypes"

interface AppState {
    connId: string,
    detailedDataId: string,
    activeUsers: User[]
}

const initialState = {
    connId: ""
} as AppState

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setCreationInfo: (state, action: PayloadAction<CreationInfo>) => {
            console.log(action.payload)
            state.connId = action.payload.connId
            state.detailedDataId = action.payload.detailedDataId
        },
        setActiveUsers: (state, action: PayloadAction<User[]>) => {
            state.activeUsers = action.payload
        }
    }
})

export const { setCreationInfo, setActiveUsers } = appSlice.actions

export const appReducer = appSlice.reducer;