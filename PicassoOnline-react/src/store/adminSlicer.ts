import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../connector/types/responseTypes"

interface AppState {
    activeUsers: User[],
    usersImages: { [connId: string]: string }
}

const initialState = {
    activeUsers: [],
    usersImages: {}
} as AppState

export const admimSlicer = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setActiveUsers: (state, action: PayloadAction<User[]>) => {
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