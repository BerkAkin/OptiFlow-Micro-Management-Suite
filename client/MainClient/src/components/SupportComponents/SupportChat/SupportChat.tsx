import React, { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr';
import send from "../../../assets/send.svg";


function SupportChat({ CurrentUserOnChat, closeChatWindow }: { CurrentUserOnChat: { username: string, userId: string }, closeChatWindow: () => any }) {

    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState("");



    useEffect(() => {

        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("/hr-support", {
                accessTokenFactory: () => localStorage.getItem("AccessToken") || "",
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Error)
            .build();

        setConnection(newConnection);
    }, [])



    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.off("ReceiveMessage");
                    connection.on("ReceiveMessage", (senderId, message) => {
                        if (senderId.toString() === CurrentUserOnChat.userId.toString()) {
                            setMessages(prev => [...prev, {
                                senderId: CurrentUserOnChat.username,
                                message: message
                            }]);
                        } else {
                            console.log("Başka birinden mesaj geldi:", senderId);
                        }
                    });
                })
                .catch(e => console.log("Bağlantı Hatası: ", e));
            return () => {
                connection.off("ReceiveMessage");
                setMessages([]);
            };
        }
    }, [connection, CurrentUserOnChat]);



    const sendMessage = async (receiver: string) => {
        if (connection) {
            const receiverId = receiver;
            await connection.invoke("SendToUser", receiverId, text);
            setMessages(prev => [...prev, { senderId: "Ben", message: text }]);
            setText("");
        }

    }


    return (

        <div className='h-[100%] border-gray-200'>
            <div className='h-[15%] p-4 flex justify-between border-b border-gray-200'>
                <p className='text-slate-800 capitalize text-lg'>{CurrentUserOnChat.username}</p>
                <button className='text-red-400 cursor-pointer text-lg' onClick={closeChatWindow}>✖</button>
            </div>
            <div className='h-[265px] p-4 overflow-auto'>
                {messages.map((m, index) => (
                    <div className='my-1 text-wrap break-all' key={index}>
                        <p>
                            <span className='font-bold '>{m.senderId}: </span>
                            {m.message}
                        </p>
                    </div>
                ))}
            </div>
            <div className='h-[15%] grid grid-cols-12 border-t border-gray-200'>
                <div className='col-span-10'>
                    <textarea rows={2} placeholder='Message...' className='resize-none w-full px-4 outline-none bg-white rounded-bl' value={text} onChange={e => setText(e.target.value)} />
                </div>
                <div className='col-span-2 flex items-center justify-center bg-sky-600 hover:bg-sky-500 transition-all rounded-br'>
                    <button className='w-full' onClick={() => sendMessage(CurrentUserOnChat.userId.toString())}>
                        <img src={send} className='px-4' />
                    </button>

                </div>
            </div>
        </div>

    )
}

export default SupportChat
