import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import { CreateUserResponse, InitialBoardData, User } from "./types/responseTypes";

export const connector = new HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl("http://localhost:5125/draw",{
        transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling,
    })
    .build();

connector.start().then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error('Error connecting to hub:', err));


export const useConnectorHandler = () => {

    const create = async () => {
        const response: string = await connector.invoke("Create")
        const boardData = JSON.parse(response) as InitialBoardData
        console.log((boardData as InitialBoardData).connId)
        return boardData;
    }

    const createUser = async (name: string, role: string) => {
        const response : string = await connector.invoke("CreateUser", name, role)
        const user = JSON.parse(response) as CreateUserResponse
        return user;
    }

    const getUserList = async () => {
        const response: string = await connector.invoke("GetAllUser");
        const users = JSON.parse(response) as User[]
        console.log(users)
        return users
    }

    const addUserToDrawBoard = async (boardId : string, username: string) => {
        const responseString : string = await connector.invoke("AddUserToBoard", boardId, username)
        const response = JSON.parse(responseString) as InitialBoardData
        return response
    }

    const getUsersFromDrawField = async (connId: string) => {
        const response = await connector.invoke("GetUserByDrawField", connId)
        return JSON.parse(response) as CreateUserResponse[]
    }

    return {
        create,
        createUser,
        getUserList,
        addUserToDrawBoard,
        getUsersFromDrawField
    }
}
