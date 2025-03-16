import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { InitialBoardData, User } from "../connector/types/responseTypes"
import { UsersDrawField } from "../components/UserInDrawList"
import { InitAppData } from "./payloadTypes"

interface AppUser {
    name: string,
    connId: string,
    role: string,
}
interface BoardData {
    ownerName: string,
    connId: string
    users: {name: string, role: string, connId: string}[],
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
           console.log(JSON.stringify(action.payload, null, 2)) // об'єкт пустий
            return {
                ...state,
                appUser: {...action.payload.appUser},
                boardData: {...action.payload.boardData, users: {...action.payload.boardData.users}},
            }
        },
        setUserName: (state, action: PayloadAction<string>) => {
            
        },
        setUsersInDrawField: (state, action: PayloadAction<UsersDrawField>) => {
                
        },
        setBoardData: (state, action: PayloadAction<InitialBoardData>) => {
            state.boardData = action.payload
        }
    }
})

export const { initData, setUserName, setUsersInDrawField, setBoardData } = appSlice.actions

export const appReducer = appSlice.reducer;