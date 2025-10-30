import React from 'react'

interface TodaysPaymentCardProps {
    Description: string,
    ToWho: string,
    Price: string
}

function TodaysPaymentsCard({ Description, ToWho, Price }: TodaysPaymentCardProps) {
    return (
        <div className='h-17 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 flex justify-center hover:bg-gray-100'>
            <div>
                <p className='ps-5 text-sm text-gray-600 p-3'>{Description}</p>
            </div>
            <div className='text-gray-600 flex items-center justify-center'>
                <p>{ToWho}</p>
            </div>
            <div className='text-gray-600 flex items-center justify-center'>
                <p>{Price}</p>
            </div>
            <div className='text-gray-600 flex items-center justify-center'>
                <button className='border bg-amber-600 hover:bg-amber-700 rounded-sm text-white p-1 w-full '>Pay</button>
            </div>
        </div>

    )
}

export default TodaysPaymentsCard
