import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../connector/types/responseTypes"

interface AppState {
    activeUsers: User[]
}

const initialState = {
    activeUsers: []
} as AppState

export const admimSlicer = createSlice({
    name: "adminSlicer",
    initialState,
    reducers: {
        setActiveUsers: (state, action: PayloadAction<User[]>) => {
            console.log(action.payload, "setActiveUsers")
            state.activeUsers = action.payload
        },
        attachBase64ImageToUser: (state, action: PayloadAction<{connId: string, base64Image: string}>) => {
            const {base64Image, connId} = action.payload
            state.activeUsers = state.activeUsers.map(x => x.connId === connId ? {...x, base64Image} : x)
        }
    }
})

export const { attachBase64ImageToUser, setActiveUsers } = admimSlicer.actions

export const adminReducer = admimSlicer.reducer;