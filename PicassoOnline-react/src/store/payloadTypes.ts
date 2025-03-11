export interface InitAppData{
    user: {
        name: string, 
        connId: string,
        role: string
    },
    boardData: {
        ownerName: string,
        users: {name: string, role: string, connId: string}[],
        detailedDataId: string,
        base64Image: string
    }
}