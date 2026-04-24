import { useEffect, useState, useRef } from 'react'
import * as signalR from '@microsoft/signalr';
import send from "../../../assets/icons/send.svg";

export function LiveChat({ CurrentUserOnChat, closeChatWindow }: { CurrentUserOnChat: { username: string, userId: string }, closeChatWindow: () => any }) {
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [text, setText] = useState("");

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

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
                                message: message,
                                isMe: false
                            }]);
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
        if (connection && text.trim() !== "") {
            const receiverId = receiver;
            await connection.invoke("SendToUser", receiverId, text);
            setMessages(prev => [...prev, { senderId: "Ben", message: text, isMe: true }]);
            setText("");
        }
    }

    return (
        <div className='flex flex-col h-full bg-slate-100 overflow-hidden'>
            <div className='h-[60px] px-5 flex items-center justify-between bg-white border-b border-gray-100'>
                <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase'>
                        {CurrentUserOnChat.username}
                    </div>
                </div>
                <button
                    className='w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 cursor-pointer text-slate-400 hover:text-red-500 transition-colors'
                    onClick={closeChatWindow}
                >
                    ✕
                </button>
            </div>

            <div
                ref={scrollRef}
                className='flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50'
            >
                {messages.length === 0 && (
                    <div className="text-center py-10 text-slate-400 text-xs italic">
                        No messages yet. Start the conversation.
                    </div>
                )}

                {messages.map((m, index) => (
                    <div key={index} className={`flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-2.5 rounded-xl text-sm shadow-sm ${m.isMe
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                            }`}>
                            {!m.isMe && <p className='text-[10px] font-bold mb-1 text-blue-600 uppercase tracking-wide'>{m.senderId}</p>}
                            <p className='leading-relaxed break-words'>{m.message}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className='p-3 bg-white border-t border-slate-100'>
                <div className='flex items-end gap-2 bg-slate-100 rounded-lg border border-gray-200 p-1 transition-colors'>
                    <textarea
                        rows={1}
                        placeholder='Type a message...'
                        className='flex-grow bg-transparent border-none text-sm px-3 py-2.5 outline-none resize-none max-h-32 text-slate-700'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage(CurrentUserOnChat.userId.toString());
                            }
                        }}
                    />
                    <button
                        className='p-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 transition-all rounded-lg shadow-md disabled:opacity-50 '
                        disabled={!text.trim()}
                        onClick={() => sendMessage(CurrentUserOnChat.userId.toString())}
                    >
                        <img src={send} className='w-5 h-5 brightness-0 invert' alt="send" />
                    </button>
                </div>
            </div>
        </div>
    )
}

