import React from 'react'
import { Link } from 'react-router-dom'




const InstallCardProps = {
    Description: "Deneme",
    Price: 12,
    DetailUrl: "DenemeDetayları",
    RemainingPart: "24"
}

function InstallmentPaymentsCard() {
    return (

        <div className='w-full h-96 '>
            <div className='w-full h-[50px] flex justify-center items-start'>
                <p className={`text-2xl text-center w-64 border-b border-x text-sky-600 border--600 bg-white rounded-b-md `} style={{ fontFamily: "roobert" }}>Installment Payments</p>
            </div>
            <div className='border-b h-5 w-full grid grid-cols-[65%_10%_10%_10%] gap-2 flex justify-center uppercase'>
                <div>
                    <p className={`text-sm font-bold text-start ps-2 w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Description</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Total</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}>Parts</p>
                </div>
                <div>
                    <p className={`text-sm font-bold text-center w-full text-gray-700 `} style={{ fontFamily: "roobert" }}></p>
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
                    <Link className='bg-indigo-400 text-white p-1 me-1 cursor-pointer hover:bg-indigo-500 rounded-sm' to={`/${InstallCardProps.DetailUrl}`}>Detail</Link>
                </div>
            </div>


        </div>

    )
}

export default InstallmentPaymentsCard
