import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import { CreationInfo, User, UsersDrawField } from "./types/responseTypes";

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
        const responseString: string = await connector.invoke("Create")
        const response = JSON.parse(responseString) as CreationInfo
        return response;
    }

    const createUser = async (name: string, role: string) => {
        await connector.invoke("CreateUser", name, role)
    }

    const getUserList = async () => {
        const response: string = await connector.invoke("GetAllUser");
        var users = JSON.parse(response) as User[]
        console.log(users)
        return users
    }

    const addUserToDrawBoard = async (username: string, boardId: string) => {
        const responseString : string = await connector.invoke("AddUserToBoard", username, boardId)
        const response = JSON.parse(responseString) as {boardId: string, detailedDataId: string}
        return response
    }

    const getUsersFromDrawField = async (connId: string) => {
        console.log(connId)
        const response = await connector.invoke("GetUserByDrawField", connId)
        console.log(response)
        return JSON.parse(response) as UsersDrawField
    }

    return {
        create,
        createUser,
        getUserList,
        addUserToDrawBoard,
        getUsersFromDrawField
    }
}
