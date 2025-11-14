import React from 'react'
import { Link } from 'react-router-dom'




const InstallCardProps = {
    Description: "Deneme",
    Price: 12,
    DetailUrl: "DenemeDetayları",
    RemainingPart: "2/4"
}

function InstallmentPaymentsCard() {
    return (

        <div className='w-full h-96 '>
            <div className='w-full h-[50px] flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 text-white bg-orange-400 rounded-b-sm font-roobert`}>Installments</p>
            </div>
            <div className='text-orange-400 border-b h-5 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 flex justify-center'>
                <div>
                    <p className={`text-sm font-bold text-start ps-2 w-full font-roobert`}>Description</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full font-roobert`}>Total</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full  font-roobert`}>Part</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full  font-roobert`}></p>
                </div>
            </div>
            <div className='h-17 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 flex justify-center hover:bg-gray-100'>
                <div>
                    <p className='ps-2 text-sm text-gray-600 p-3'>{InstallCardProps.Description}</p>
                </div>
                <div className='text-gray-600 flex items-center justify-center'>
                    <p>{InstallCardProps.Price}</p>
                </div>
                <div className='text-gray-600 flex items-center justify-center'>
                    <p>{InstallCardProps.RemainingPart}</p>
                </div>
                <div className='text-gray-600 flex items-center justify-center'>
                    <Link className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm' to={`/${InstallCardProps.DetailUrl}`}>↗</Link>
                </div>
            </div>


        </div>

    )
}

export default InstallmentPaymentsCard
