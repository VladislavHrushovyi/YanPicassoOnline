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
        },
        attachBase64ImageToUser: (state, action: PayloadAction<{connId: string, base64Image: string}>) => {
            const {base64Image, connId} = action.payload
            state.activeUsers = state.activeUsers.map(x => x.connId === connId ? {...x, base64Image} : x)
        }
    }
})

export const { setCreationInfo, setActiveUsers, attachBase64ImageToUser } = appSlice.actions

export const appReducer = appSlice.reducer;