import React from 'react'
import { Link } from 'react-router-dom'


interface InstallCardProps {
    Description: string,
    Price: string,
    Detail: string
    RemainingPart: string
}

function InstallmentPaymentsCard({ Description, Price, Detail, RemainingPart }: InstallCardProps) {
    return (

        <div className='w-full h-30 p-1 my-1'>
            <div className='bg-gray-50 w-full border h-full grid grid-cols-[65%_10%_10%_15%] hover:bg-gray-100'>
                <div>
                    <p className='ps-2 pt-1 text-xs'>
                        {Description}
                    </p>
                </div>
                <div className='flex items-center justify-center border-x'>
                    <p className='p-1'>
                        {Price}
                    </p>
                </div>
                <div className='flex items-center justify-center border-e'>
                    <p className='p-1'>
                        {RemainingPart}
                    </p>
                </div>
                <div className='flex items-center justify-center'>
                    <Link className='bg-red-400 text-white p-1 cursor-pointer border hover:bg-red-500' to={`/${Detail}`}>Detail</Link>
                </div>
            </div>

        </div>

    )
}

export default InstallmentPaymentsCard
