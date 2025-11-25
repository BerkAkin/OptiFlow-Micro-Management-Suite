import React, { useState } from 'react'

interface SuggestionCardProps {
    Status: string,
    Header: string,
    Description: string,
    VoteCount: number,
    CommentCount: number,
    Comments: {
        CommentText: string,
        Date: string,
    }[]

}

function SuggestionCard({ Status, Header, Description, VoteCount, CommentCount, Comments }: SuggestionCardProps) {

    const [commentSection, setCommentSection] = useState<boolean>(false);

    return (
        <div className='border border-gray-200 rounded-lg m-6 relative'>
            <div className='p-1 text-center flex justify-center items-center h-[25%] w-full'>
                <p className='text-gray-900'>
                    {Header}
                    <span className={`text-lg font-bold text-${Status == "Approved" ? "green" : Status == "Refused" ? "red" : "sky"}-600`}>
                        {Status == "Approved" ? " ✔" : Status == "Refused" ? " ✘" : " ━"}
                    </span>
                </p>
            </div>
            <div className='text-center flex justify-center items-center h-[25%]'>
                <p className='text-sm text-gray-700 px-6'>{Description}</p>
            </div>
            <div className='p-6 text-center flex justify-center items-center h-[25%] w-full grid grid-cols-3'>
                <div className='justify-center flex'>
                    <button className='cursor-pointer bg-red-500 rounded-full shadow-custom  w-6 text-white'>✘</button>
                    <button className='cursor-pointer bg-green-500 rounded-full shadow-custom  w-6 text-white mx-1 '>✔</button>
                </div>
                <div>
                    <p className='text-gray-800'><span><button className='cursor-pointer text-2xl'>⇩</button></span> {VoteCount} <span><button className=' cursor-pointer text-2xl'>⇧</button></span></p>
                </div>
                <div>
                    <p className='text-gray-800'><button className='cursor-pointer' onClick={() => setCommentSection(!commentSection)}><span>☰</span> </button> {CommentCount} <span></span></p>
                </div>
            </div>
            {commentSection &&
                <div className='border-t border-gray-200 h-[200px] w-full overflow-y-auto'>
                    {Comments.map((item, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-none py-2 px-5 text-sm text-gray-600 text-center">
                            {index + 1}) {item.CommentText}
                            <span className="text-sm text-gray-400 ps-1">{item.Date}</span>
                        </div>
                    ))}

                </div>
            }
        </div >
    )
}

export default SuggestionCard
