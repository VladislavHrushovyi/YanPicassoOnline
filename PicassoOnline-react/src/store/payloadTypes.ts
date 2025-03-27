import { InitialBoardData } from "../connector/types/responseTypes"

export interface InitAppData{
    appUser: {
        name: string, 
        connId: string,
        role: string,
        boards: InitialBoardData[]
    },
    boardData: {
        owner: string,
        users: {name: string, role: string, connId: string, boards: InitialBoardData[]}[],
        detailedDataId: string,
        base64Image: string,
        connId: string
    }
}