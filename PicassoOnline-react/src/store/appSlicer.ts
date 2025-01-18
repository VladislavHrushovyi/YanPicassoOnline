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
        }
    }
})

export const { setCreationInfo } = appSlice.actions

export const appReducer = appSlice.reducer;