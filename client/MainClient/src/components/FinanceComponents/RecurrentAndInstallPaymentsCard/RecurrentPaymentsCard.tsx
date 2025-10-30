import React from 'react'

interface RecurCardProps {
    Description: string,
    Price: string
}

function RecurrentPaymentsCard({ Description, Price }: RecurCardProps) {
    return (

        <div className='w-full h-20 p-1 my-1'>
            <div className='bg-gray-50 w-full border h-full grid grid-cols-[75%_25%] hover:bg-gray-100'>
                <div className=''>
                    <p className='ps-2 pt-1 text-xs'>
                        {Description}
                    </p>
                </div>
                <div className='flex items-center justify-center'>
                    <p className='p-1'>
                        {Price}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default RecurrentPaymentsCard
