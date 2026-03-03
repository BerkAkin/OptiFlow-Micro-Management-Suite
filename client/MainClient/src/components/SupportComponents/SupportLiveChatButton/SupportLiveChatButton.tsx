import React, { useState } from 'react'
import help from '../../../assets/helpRequest.svg'
import SupportChatUserList from '../SupportChatUserList/SupportChatUserList';

function SupportLiveChatButton() {
    const [chatUserList, setChatUserList] = useState(false);
    const toggleList = () => {
        setChatUserList(prev => !prev)
    }

    return (
        <div>
            <div>
                {chatUserList && <SupportChatUserList />}
            </div>
            <div className='flex justify-end mt-2'>
                <button onClick={toggleList} className='bg-white size-12 bottom-2 right-2 shadow-custom border border-gray-200 rounded-full hover:scale-[104%] transition-all cursor-pointer'>
                    <img src={help} />
                </button>
            </div>

        </div>

    )
}

export default SupportLiveChatButton
