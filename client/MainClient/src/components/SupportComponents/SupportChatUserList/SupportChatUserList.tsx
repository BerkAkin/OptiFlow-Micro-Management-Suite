import { useState } from 'react'
import { useUserList } from '../../../hooks/SupportHooks/UseSupport';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import SupportChat from '../SupportChat/SupportChat';

interface currentUserState {
    username: string,
    userId: string
}

function SupportChatUserList() {
    const [currentUserOnChat, setCurrentUserOnChat] = useState<currentUserState | null>();
    const { data, isLoading, error } = useUserList();

    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;

    return (
        <div className='bg-white rounded-xl shadow-custom w-full max-w-[900px] h-[600px] grid grid-cols-12 overflow-hidden border border-gray-200'>

            <div className='col-span-4 border-e border-gray-100 bg-slate-50/50 flex flex-col h-full'>
                <div className="p-5 border-b border-gray-100 bg-white">
                    <h2 className='font-bold font-rubik text-slate-800 text-lg tracking-tight'>
                        Live Support
                    </h2>
                    <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Active Conversations</p>
                </div>

                <div className='flex-grow overflow-y-auto p-3 space-y-2'>
                    {data.map((item: any) => {
                        const isActive = currentUserOnChat?.userId === item.id;
                        return (
                            <div
                                key={item.id}
                                onClick={() => { setCurrentUserOnChat({ userId: item.id, username: item.name }) }}
                                className={`group flex border-gray-200 border items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200
                                    ${isActive
                                        ? 'bg-blue-600 '
                                        : 'hover:bg-white'}
                                `}
                            >
                                <div className={`
                                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0
                                    ${isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600'}
                                `}>
                                    {item.name.charAt(0).toUpperCase()}
                                </div>

                                <div className='overflow-hidden'>
                                    <p className={`text-sm font-semibold capitalize truncate ${isActive ? 'text-white' : 'text-slate-700'}`}>
                                        {item.name}
                                    </p>
                                    <p className={`text-[11px] truncate ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                                        Click to view chat
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='col-span-8 bg-slate-50 flex flex-col relative'>
                {currentUserOnChat ? (
                    <SupportChat
                        CurrentUserOnChat={currentUserOnChat}
                        closeChatWindow={() => setCurrentUserOnChat(null)}
                    />
                ) : (
                    <div className='flex flex-col items-center justify-center h-full text-center p-10'>

                        <h3 className='text-slate-800 font-bold text-lg'>No Chat Selected</h3>
                        <p className='text-slate-400 text-sm max-w-[250px] mt-1'>
                            Select a user from the left to start a conversation.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SupportChatUserList;