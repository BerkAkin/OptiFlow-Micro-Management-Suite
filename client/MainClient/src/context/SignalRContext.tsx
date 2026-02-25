import React, { createContext, useContext, useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr';

const SignalRContext = createContext<null | any>(null);

export const SignalRContextProvider = ({ children, token }: any) => {

    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("http://localhost:5005/hr-support", {
                accessTokenFactory: () => token,
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            }).withAutomaticReconnect().build();

        newConnection.start().then(() => {
            console.log("signal bağlandı");
            setConnection(newConnection);
        })
            .catch(err => console.error("Bağlantı Hatası: ", err));

        newConnection.on("UserListUpdated", (users) => {
            setOnlineUsers(users);
        });

        return () => {
            newConnection.stop();
        };

    }, [token]);

    return (
        <SignalRContext.Provider value={{ connection, onlineUsers }}>
            {children}
        </SignalRContext.Provider>
    );
}

export const useSignalR = () => useContext(SignalRContext);
