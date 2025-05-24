import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { CreateUserResponse, DrawBoardInfoShort, InitialBoardData } from "./types/responseTypes";
import React, { useEffect } from "react";
import { RootAction } from "../types/BroadcastActionTypes";

let connector: HubConnection | null = null;

export const useConnectorHandler = () => {

    const [isConnecting, setIsConnecting] = React.useState(false);

    useEffect(() => {
        if (!connector) {
            connector = new HubConnectionBuilder()
                .withUrl("http://localhost:5125/draw", {
                    transport: HttpTransportType.WebSockets | HttpTransportType.LongPolling,
                })
                .withAutomaticReconnect()
                .build();
    
            connector.start()
                .then(() =>{
                    setIsConnecting(_ => true);
                })
                .catch(_ => {
                    setIsConnecting(_ => false);
                });
    
            connector.onclose(async () => {
                setIsConnecting(() => false);
                try {
                    await connector!.start();
                    setIsConnecting(_ => true);
                } catch (err) {
                    setIsConnecting(_ => false);
                }
            });
        }
    }, []);

    const create = async () => {
        if (connector?.state !== HubConnectionState.Connected) {
            console.warn("🔴 SignalR не підключено. Очікуємо підключення...");
            await connector?.start();
        }
        const response: string = await connector!.invoke("Create");
        return JSON.parse(response) as InitialBoardData;
    };

    const createUser = async (name: string, role: string) => {
        if (connector?.state !== HubConnectionState.Connected) {
            console.warn("🔴 SignalR не підключено. Очікуємо підключення...");
            await connector?.start();
        }
        const response: string = await connector!.invoke("CreateUser", name, role);
        return JSON.parse(response) as CreateUserResponse;
    };

    const getUserList = async () => {
        const response: string = await connector!.invoke("GetAllUser");
        return JSON.parse(response) as CreateUserResponse[];
    };

    const getConnectedDrwawField = async () => {
        const response = await connector!.invoke("GetDrawFieldsByUser");
        return JSON.parse(response) as DrawBoardInfoShort[];
    }

    const getDrawboards = async () => {
        const response: string = await connector!.invoke("GetAllDrawBoards");
        return JSON.parse(response) as InitialBoardData[];
    };

    const addUserToDrawBoard = async (boardId: string, username: string) => {
        const responseString: string = await connector!.invoke("AddUserToBoard", boardId, username);
        return JSON.parse(responseString) as InitialBoardData;
    };

    const getUsersFromDrawField = async (connId: string) => {
        const response = await connector!.invoke("GetUserByDrawField", connId);
        return JSON.parse(response) as CreateUserResponse[];
    };

    const sendAction = async (drawBoardId: string, action: RootAction) => {
        await connector!.invoke("BroadcastDataInteraction", drawBoardId, JSON.stringify(action));
    }

    return {
        isConnecting,
        connector,
        create,
        createUser,
        getUserList,
        sendAction,
        getDrawboards,
        addUserToDrawBoard,
        getUsersFromDrawField,
        getConnectedDrwawField
    };
};
