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
                <p className={`text-2xl text-center w-64 text-white bg-orange-400 rounded-b-sm `} style={{ fontFamily: "roobert" }}>Remainings</p>
            </div>
            <div className='border-b h-5 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 text-orange-400 flex justify-center'>
                <div>
                    <p className={`text-sm font-bold text-start ps-5 w-full `} style={{ fontFamily: "roobert" }}>Description</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full `} style={{ fontFamily: "roobert" }}>To</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full `} style={{ fontFamily: "roobert" }}>Price</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full `} style={{ fontFamily: "roobert" }}></p>
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
                    <button className='bg-gray-400 hover:bg-gray-500 rounded-sm text-white p-1 me-1 w-full '>$</button>
                </div>
            </div>
        </div>


    )
}

export default TodaysPaymentsCard
