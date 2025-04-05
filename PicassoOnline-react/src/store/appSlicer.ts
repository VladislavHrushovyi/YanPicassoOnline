import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DrawBoardInfoShort, InitialBoardData } from "../connector/types/responseTypes"
import { InitAppData } from "./payloadTypes"

interface AppUser {
    name: string,
    connId: string,
    role: string,
    boards: DrawBoardInfoShort[]
}
interface BoardData {
    owner: string,
    connId: string
    users: Array<AppUser>,
    detailedDataId: string,
    base64Image: string
}

interface AdminData {
    users: AppUser[],
    boards: InitialBoardData[]
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
        boards: []
    },
    boardData: {
        owner: "",
        users: [] as Array<AppUser>,
        detailedDataId: "",
        base64Image:"",
        connId: ""
    },
    adminData:{
        users: [],
        boards: []
    }
} as AppState

export const appSlice = createSlice({
    name: "appSlicer",
    initialState,
    reducers: {
        initData: (state, action: PayloadAction<InitAppData>) => {
           console.log(action.payload)
            return {
                ...state,
                appUser: { ...action.payload.appUser },
                boardData: { ...action.payload.boardData },
            }
        },
        setBoardData: (state, action: PayloadAction<InitialBoardData>) => {
            state.boardData = action.payload
        },
        setBase64Image: (state, action: PayloadAction<string>) => {
            state.boardData.base64Image = action.payload
        },
        setBoardUsers: (state, action: PayloadAction<AppUser[]>) => {
            state.boardData.users = action.payload
        },
        setAdminAllUserList: (state, action: PayloadAction<AppUser[]>) => {
            state.adminData.users = action.payload
        },
        setAdminAllBoardList: (state, action: PayloadAction<InitialBoardData[]>) => {
            console.log(action.payload)
            state.adminData.boards = action.payload
        },
        setAppUser: (state, action: PayloadAction<AppUser>) => {
            state.appUser = action.payload
        },
        setConnectedDrawBoards: (state, action: PayloadAction<DrawBoardInfoShort[]>) => {
            state.appUser.boards = action.payload
        }

    }
})

export const { 
    initData, 
    setBoardData,
    setBase64Image, 
    setBoardUsers,
    setAppUser, 
    setAdminAllUserList, 
    setAdminAllBoardList, 
    setConnectedDrawBoards
} = appSlice.actions

export const appReducer = appSlice.reducer;