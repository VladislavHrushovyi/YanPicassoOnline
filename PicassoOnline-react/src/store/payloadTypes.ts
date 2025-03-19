export interface InitAppData{
    appUser: {
        name: string, 
        connId: string,
        role: string
    },
    boardData: {
        owner: string,
        users: {name: string, role: string, connId: string}[],
        detailedDataId: string,
        base64Image: string,
        connId: string
    }
}