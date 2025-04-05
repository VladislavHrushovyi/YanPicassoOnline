import { DrawBoardInfoShort } from "../connector/types/responseTypes"

export interface InitAppData{
    appUser: {
        name: string, 
        connId: string,
        role: string,
        boards: DrawBoardInfoShort[]
    },
    boardData: {
        owner: string,
        users: {name: string, role: string, connId: string, boards: DrawBoardInfoShort[]}[],
        detailedDataId: string,
        base64Image: string,
        connId: string
    }
}