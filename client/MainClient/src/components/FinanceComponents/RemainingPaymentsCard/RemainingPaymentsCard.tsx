import React from 'react'

const TodaysPayments = {
    Description: "Deneme Ödemeler",
    ToWho: "Berk",
    Price: "2000"
}

function TodaysPaymentsCard() {
    return (
        <div>
            <div className='w-full h-[50px] text-center flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 border-b border-x text-orange-400 border-orange-400 bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Remaining Payments</p>
            </div>
            <div className='border-b h-5 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 flex justify-center uppercase'>
                <div>
                    <p className={`text-sm font-bold text-start ps-5 w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Description</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>To</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Price</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}></p>
                </div>
            </div>

            <div className='h-17 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 flex justify-center hover:bg-gray-100'>
                <div>
                    <p className='ps-5 text-sm text-gray-600 p-3'>{TodaysPayments.Description}</p>
                </div>
                <div className='text-gray-600 flex items-center justify-center'>
                    <p>{TodaysPayments.ToWho}</p>
                </div>
                <div className='text-gray-600 flex items-center justify-center'>
                    <p>{TodaysPayments.Price}</p>
                </div>
                <div className='text-gray-600 flex items-center justify-center'>
                    <button className='bg-indigo-400 hover:bg-indigo-500 rounded-sm text-white p-1 me-1 w-full '>Pay</button>
                </div>
            </div>
        </div>


    )
}

export default TodaysPaymentsCard
