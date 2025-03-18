import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialBoardData, User } from "../connector/types/responseTypes"
import { InitAppData } from "./payloadTypes"

interface AppUser {
    name: string,
    connId: string,
    role: string,
}
interface BoardData {
    ownerName: string,
    connId: string
    users: Array<AppUser>,
    detailedDataId: string,
    base64Image: string
}

interface AdminData {
    users: User[],
}
interface AppState {
    appUser: AppUser,
    boardData: BoardData,
    adminData: AdminData
}

const initialState = {
    appUser: {
        name: "",
        connId: "",
        role: "",
    },
    boardData: {
        ownerName: "",
        users: [] as Array<AppUser>,
        detailedDataId: "",
        base64Image:"",
        connId: ""
    },
    adminData:{
        users: []
    }
} as AppState

export const appSlice = createSlice({
    name: "appSlicer",
    initialState,
    reducers: {
        initData: (state, action: PayloadAction<InitAppData>) => {
           console.log(action.payload) // об'єкт пустий
            return {
                ...state,
                appUser: { ...action.payload.appUser },
                boardData: { ...action.payload.boardData },
            }
        },
        setBoardData: (state, action: PayloadAction<InitialBoardData>) => {
            state.boardData = action.payload
        }
    }
})

export const { initData, setBoardData } = appSlice.actions

export const appReducer = appSlice.reducer;