import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AppState {
    drawboardName: string
}

const initialState = {
    drawboardName: ""
} as AppState

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setDrawboardName: (state, action: PayloadAction<string>) => {
            state.drawboardName = action.payload
        }
    }
})

export const {setDrawboardName} = appSlice.actions

export default appSlice.reducer;