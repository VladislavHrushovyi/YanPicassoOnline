export interface User {
    connId : string,
    name: string,
    detailedDataId: string,
    base64Image: string
}

export interface UsersDrawField {
    owner: string,
    usersName: string[]
}

export interface CreationInfo {
    connId: string,
    detailedDataId: string,
}