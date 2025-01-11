import { HttpTransportType, HubConnectionBuilder } from "@microsoft/signalr";
import { User, UsersDrawField } from "./types/responseTypes";

export const connector = new HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl("http://localhost:5125/draw",{
        transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling,
    })
    .build();

connector.start().then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error('Error connecting to hub:', err));


export const getUsersFromDrawField = async (connId: string) => {
    const response = await connector.invoke("GetUserByDrawField", connId)

    return JSON.parse(response) as UsersDrawField
}

export const useConnectorHandler = () => {

    const create = async (name: string) => {
        const response: string = await connector.invoke("Create", name)

        return response;
    }

    const getUserList = async () => {
        const response: string = await connector.invoke("GetAllUser");
        var users = JSON.parse(response) as User[]
        console.log(users)
        return users
    }

    const receiveDrawData = () => {

    }

    return {
        create,
        getUserList,
        receiveDrawData
    }
}
