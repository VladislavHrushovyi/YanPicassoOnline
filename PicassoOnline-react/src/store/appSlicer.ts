import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "../connector/types/responseTypes"
import { UsersDrawField } from "../components/UserInDrawList"
import { InitAppData } from "./payloadTypes"

interface AppUser {
    name: string,
    connId: string,
    role: string,
}
interface BoardData {
    ownerName: string
    users: {name: string, role: string}[],
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
        users: [],
        detailedDataId: "",
        base64Image:""
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
            state.appUser = initialState.appUser
            state.boardData = initialState.boardData
        },
        setUserName: (state, action: PayloadAction<string>) => {
            
        },
        setUsersInDrawField: (state, action: PayloadAction<UsersDrawField>) => {
                
        }
    }
})

export const { initData, setUserName, setUsersInDrawField } = appSlice.actions

export const appReducer = appSlice.reducer;