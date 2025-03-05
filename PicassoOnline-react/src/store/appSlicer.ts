import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CreationInfo, User } from "../connector/types/responseTypes"

interface AppState {
    username: string,
    connId: string,
    detailedDataId: string,
    activeUsers: User[]
}

const initialState = {
    connId: "",
    username: ""
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
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        }
    }
})

export const { setCreationInfo, setUserName } = appSlice.actions

export const appReducer = appSlice.reducer;