import { HubConnectionBuilder } from "@microsoft/signalr";

export const connector = new HubConnectionBuilder()
.withAutomaticReconnect()
.withUrl("http://localhost:5125/draw")
.build();

connector.start().then(() => console.log('Connected to SignalR hub'))
.catch(err => console.error('Error connecting to hub:', err));


