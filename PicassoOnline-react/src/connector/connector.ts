import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { CreateUserResponse, InitialBoardData } from "./types/responseTypes";
import React, { useEffect } from "react";

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
                    console.log('✅ Connected to SignalR hub')
                    setIsConnecting(_ => true);
                })
                .catch(err => {
                    console.error('❌ Error connecting to hub:', err)
                    setIsConnecting(_ => false);
                });
    
            connector.onclose(async () => {
                console.log("❌ SignalR Disconnected. Reconnecting...");
                setIsConnecting(() => false);
                try {
                    await connector!.start();
                    console.log("✅ SignalR Reconnected.");
                    setIsConnecting(_ => true);
                } catch (err) {
                    console.error("❌ Reconnection failed:", err);
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

    return {
        isConnecting,
        create,
        createUser,
        getUserList,
        getDrawboards,
        addUserToDrawBoard,
        getUsersFromDrawField
    };
};
