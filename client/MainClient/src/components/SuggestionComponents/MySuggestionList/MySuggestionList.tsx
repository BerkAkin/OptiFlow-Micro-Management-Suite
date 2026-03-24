import React from 'react'

function MySuggestionList() {
    return (
        <div className='h-[650px] bg-white rounded-lg shadow-custom border border-gray-200'>
            <div className='h-[10%] text-start flex justify-start'>
                <p className={`text-xl font-semibold text-slate-800 font-rubik ps-6 py-4`}>My Suggestions</p>
            </div>

            <div className='h-[90%] overflow-y-auto my-6 grid gap-6 px-6 grid-cols-12'>

            </div>

        </div>
    )
}

export default MySuggestionList
