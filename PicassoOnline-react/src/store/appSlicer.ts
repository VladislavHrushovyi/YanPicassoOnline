import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CreationInfo, User } from "../connector/types/responseTypes"
import { UsersDrawField } from "../components/UserInDrawList"

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
        setCreationInfo: (state, action: PayloadAction<CreationInfo>) => {
            console.log(action.payload)
            state.connId = action.payload.connId
            state.detailedDataId = action.payload.detailedDataId
        },
        setUserName: (state, action: PayloadAction<string>) => {
            state.username = action.payload,
            state.usersInDrawFiled.owner = action.payload
        },
        setUsersInDrawField: (state, action: PayloadAction<UsersDrawField>) => {
                state.usersInDrawFiled = action.payload
        }
    }
})

export const { setCreationInfo, setUserName, setUsersInDrawField } = appSlice.actions

export const appReducer = appSlice.reducer;