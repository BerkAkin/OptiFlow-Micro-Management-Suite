import React, { useState } from 'react'




function MySuggestions() {



    return (
        <div className='border w-full h-[500px] bg-white rounded-lg shadow-custom border'>
            <div className='h-[10%] w-full text-center flex justify-center items-start'>
                <p className={`text-2xl text-center px-2 text-white bg-indigo-400 rounded-b-sm font-rubik`}>My Suggestions</p>
            </div>

            <div className={`h-[10%] p-2 text-indigo-400 font-bold border-b text-md grid grid-cols-10`}>
                <div className="col-span-2 text-start">
                    Header
                </div>
                <div className="col-span-5 text-start px-4">
                    Description
                </div>
                <div className="col-span-1 text-center ">
                    Votes
                </div>
                <div className="col-span-1 text-center">
                    Status
                </div>
                <div className="col-span-1 text-center">
                    Date
                </div>
            </div>
            <div className="h-[70%] border-b overflow-y-auto ">
                <div className="text-gray-700 p-2 bg-gray-50 hover:bg-gray-200 text-md grid grid-cols-10">
                    <div className="col-span-2 text-start">
                        Deneme Header
                    </div>
                    <div className="col-span-5 text-start px-4">
                        Deneme Description
                    </div>
                    <div className="col-span-1 text-center ">
                        12
                    </div>
                    <div className="col-span-1 text-center">
                        Approved
                    </div>
                    <div className="col-span-1 text-center">
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
                    <div className='col-span-2 flex justify-start'>
                    </div>
                    <div className='flex col-span-1 items-center'>
                        <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] ms-2'>{"🡸"}</button>
                        <button className='rounded-sm bg-gray-400 hover:bg-gray-500 h-[30px] w-[50px] text-white w-[50%] mx-2'>{"🡺"}</button>
                    </div>
                </div>



            </div>


        </div>
    )
}

export default MySuggestions
