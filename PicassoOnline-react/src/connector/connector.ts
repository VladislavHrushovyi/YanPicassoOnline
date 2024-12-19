import { HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "./types/responseTypes";
import { Params } from "react-router-dom";

export const connector = new HubConnectionBuilder()
    .withAutomaticReconnect()
    .withUrl("http://localhost:5125/draw")
    .build();

connector.start().then(() => console.log('Connected to SignalR hub'))
    .catch(err => console.error('Error connecting to hub:', err));

export const getUsersFromDrawField = async (connId: string) => {
    const response = await connector.invoke("GetUserByDrawField", connId)

    return response
}

export const sendDrawBoardState = async (connId: string, base64: string) => {
    console.log(connId, 'connId')
    const response = await connector.invoke("UpdateDrawBoard", connId, base64)
    console.log(`Is updated board: ${response}`)
}

export const useConnectorHandler = () => {

    const create = async (name: string) => {
        const response: string = await connector.invoke("Create", name)

        return response;
    }

    const getUserList = async () => {
        const response: string = await connector.invoke("GetAllUser");
        var users = JSON.parse(response) as User[]

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
