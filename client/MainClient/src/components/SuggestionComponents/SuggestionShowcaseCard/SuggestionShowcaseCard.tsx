import React from 'react'

interface suggestionShowcaseProps {
    isStar: boolean
    Description: string,
    VoteCount: number
}

function SuggestionShowcaseCard({ isStar, Description, VoteCount }: suggestionShowcaseProps) {
    return (
        <div className='bg-white rounded-lg h-[100px] shadow-lg border grid grid-cols-10'>
            <div className='col-span-2 flex items-center justify-center'>
                <p className={`${isStar == true ? "text-6xl" : "text-7xl pb-2"} text-amber-500`}>{isStar == true ? "★" : "☺︎"}</p>
            </div>
            <div className='col-span-6'>
                <p className='text-gray-700 text-lg h-full w-full pt-6 px-5'>{Description}</p>
            </div>
            <div className='col-span-2 flex justify-center items-center'>
                <p className='text-4xl text-gray-600'>{VoteCount}</p>
            </div>
        </div>
    )
}

export default SuggestionShowcaseCard
