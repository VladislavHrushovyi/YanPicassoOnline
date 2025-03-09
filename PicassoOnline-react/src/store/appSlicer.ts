import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CreationInfo, User } from "../connector/types/responseTypes"
import { UsersDrawField } from "../components/UserInDrawList"

interface AppState {
    username: string,
    connId: string,
    detailedDataId: string,
    activeUsers: User[],
    usersInDrawFiled: UsersDrawField
}

const initialState = {
    connId: "",
    username: "",
    usersInDrawFiled: {owner: ""},
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