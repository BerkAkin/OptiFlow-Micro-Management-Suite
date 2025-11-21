import React from 'react'

function MoodTable() {
    return (
        <div className=' w-full h-full '>
            <div className='h-[10%] w-full text-center flex justify-center items-start'>
                <p className={`text-xl text-center px-2 text-white bg-rose-400 rounded-b-sm font-rubik`}>Previous Moods</p>
            </div>

            <div className={`h-[10%] p-2 text-rose-400 font-bold border-b text-md grid grid-cols-10`}>
                <div className="col-span-3 text-center ">
                    Mood
                </div>
                <div className="col-span-4 text-center">
                    Tags
                </div>
                <div className="col-span-3 text-center">
                    Date
                </div>
            </div>
            <div className="h-[70%] overflow-y-auto ">
                <div className="text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid grid-cols-10">
                    <div className="col-span-3 text-center ">
                        Happy
                    </div>
                    <div className="col-span-4 text-center">
                        Work, Friends, Food, Weather
                    </div>
                    <div className="col-span-3 text-center">
                        12.02.2025
                    </div>
                </div>
            </div>
            <div className='h-[10%] flex items-center'>
                <div className='grid grid-cols-12'>
                    <div className='col-span-3'>
                    </div>
                    <div className='col-span-3'>
                    </div>
                    <div className='col-span-3'>

                    </div>
                    <div className='col-span-1 flex justify-start'>
                    </div>
                    <div className='flex col-span-2 items-center'>
                        <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] ms-2'>{"🡸"}</button>
                        <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] mx-2'>{"🡺"}</button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default MoodTable
