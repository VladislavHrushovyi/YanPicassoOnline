export interface User {
    connId: string,
    name: string,
    detailedDataId: string,
    base64Image: string
}

export interface UsersDrawField {
    owner: string,
    usersName: string[]
}

export interface InitialBoardData {
    ownerName: string,
    users: { name: string, role: string, connId: string }[],
    detailedDataId: string,
    base64Image: string

}

export interface CreateUserResponse {
    name: string,
    role: string,
    connId: string
}