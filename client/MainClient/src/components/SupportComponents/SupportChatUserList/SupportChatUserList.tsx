import React, { useState } from 'react'
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
        <div className='border border-gray-200 bg-white rounded-lg shadow-custom w-[500px] h-96 grid grid-cols-12'>

            <div className='col-span-4 border-e border-gray-200 flex flex-col items-center justify-start py-2 overflow-auto'>
                <p className={`px-1 py-3 font-semibold font-rubik text-slate-800`} >
                    Live Support
                </p>
                {data.map((item: any) => (
                    <div key={item.id} className='my-2 hover:bg-gray-100 flex items-center justify-center bg-white w-[90%] h-[10%] border border-gray-200 rounded-md'>
                        <button className='capitalize rounded cursor-pointer size-full text-slate-700 text-sm' onClick={() => { setCurrentUserOnChat({ userId: item.id, username: item.name }) }}>{item.name}</button>
                    </div>
                ))}

            </div>
            <div className='col-span-8'>
                {
                    currentUserOnChat && <SupportChat CurrentUserOnChat={currentUserOnChat} closeChatWindow={() => setCurrentUserOnChat(null)} />
                }
            </div>
        </div>
    )
}

export default SupportChatUserList
