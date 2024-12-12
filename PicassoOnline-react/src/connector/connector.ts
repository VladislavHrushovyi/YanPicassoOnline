import { HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "./types/responseTypes";
import { UsersDrawField } from "../components/UserInDrawList";

export const connector = new HubConnectionBuilder()
.withAutomaticReconnect()
.withUrl("http://localhost:5125/draw")
.build();

connector.start().then(() => console.log('Connected to SignalR hub'))
.catch(err => console.error('Error connecting to hub:', err));

export const getUsersFromDrawField = async (connId: string) => {
    const response = await connector.invoke("GetUserByDrawField", connId)
    //console.log(response)

    const obj = JSON.parse(response)
    console.log(obj)
    return obj
}

export const useConnectorHandler = () => {

    const create = async (name : string) => {
        const response : string = await connector.invoke("Create", name)

        return response;
    }

    const getUserList = async () => {
       const response : string = await connector.invoke("GetAllUser");
       console.log(response)
        var users = JSON.parse(response) as User[]
        console.log(users, "active users")

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
