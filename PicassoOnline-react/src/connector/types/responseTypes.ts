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
    owner: string,
    users: Array<CreateUserResponse>,
    detailedDataId: string,
    base64Image: string,
    connId: string
}

export interface CreateUserResponse {
    name: string,
    role: string,
    connId: string,
    boards: InitialBoardData[]
}

export interface AddUserToBaord {

}