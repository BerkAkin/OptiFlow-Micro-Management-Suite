import React from 'react'

const TodaysPayments = {
    Description: "Deneme Ödemeler",
    ToWho: "Berk",
    Price: "2000"
}

function TodaysPaymentsCard() {
    return (
        <div className='w-full h-full'>

            <div className='h-[10%] w-full h-[50px] flex justify-center items-start'>
                <p className={`text-2xl text-center  px-6  text-white bg-orange-400 rounded-b-sm font-rubik`}>Installments</p>
            </div>
            <div className='h-[10%] flex items-center text-orange-400 text-center font-bold border-b  grid grid-cols-12 gap-2 flex justify-center'>
                <div className='col-span-8'>
                    <p className={`text-sm text-start ps-5 font-rubik`}>Description</p>
                </div>
                <div className='col-span-2'>
                    <p className={`text-sm  w-full font-rubik`}>To</p>
                </div>
                <div className='col-span-1'>
                    <p className={`text-sm w-full font-rubik`}>Price</p>
                </div>
                <div className='col-span-1'>
                    <p></p>
                </div>
            </div>
            <div className='overflow-y-auto h-[75%]'>

                <div className='grid grid-cols-12 gap-2 hover:bg-gray-100'>
                    <div className='col-span-8'>
                        <p className='ps-5 text-sm text-gray-600 p-3 text-wrap'>{TodaysPayments.Description}</p>
                    </div>
                    <div className='col-span-2 text-gray-600 flex items-center justify-center'>
                        <p>{TodaysPayments.ToWho}</p>
                    </div>
                    <div className='col-span-1 text-gray-600 flex items-center justify-center'>
                        <p>{TodaysPayments.Price}</p>
                    </div>
                    <div className='col-span-1 text-gray-600 flex items-center justify-center'>
                        <button className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm'>$</button>
                    </div>
                </div>

            </div>



        </div>

    )
}

export default TodaysPaymentsCard
