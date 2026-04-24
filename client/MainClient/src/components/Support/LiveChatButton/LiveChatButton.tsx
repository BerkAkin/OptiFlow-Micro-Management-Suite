import { useState } from 'react'
import { helpRequest } from '../../../assets/icons'
import { LiveChatList } from '../LiveChatList/LiveChatList';

export function LiveChatButton() {
    const [chatUserList, setChatUserList] = useState(false);
    const toggleList = () => {
        setChatUserList(prev => !prev)
    }

    return (
        <div>
            <div>
                {chatUserList && <LiveChatList />}
            </div>
            <div className='flex justify-end mt-2'>
                <button onClick={toggleList} className='bg-white size-12 bottom-2 right-2 shadow-custom border border-gray-200 rounded-full hover:scale-[104%] transition-all cursor-pointer'>
                    <img src={helpRequest} />
                </button>
            </div>

        </div>

    )
}

