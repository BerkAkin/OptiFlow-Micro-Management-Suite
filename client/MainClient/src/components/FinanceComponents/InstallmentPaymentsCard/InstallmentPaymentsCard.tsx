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

        <div className='w-full h-full border'>

            <div className='h-[10%] w-full h-[50px] flex justify-center items-start'>
                <p className={`text-2xl text-center  px-2  text-white bg-orange-400 rounded-b-sm font-roobert`}>Installments</p>
            </div>
            <div className='h-[10%] flex items-center text-orange-400 text-center font-bold border-b  grid grid-cols-12 gap-2 flex justify-center'>
                <div className='col-span-8'>
                    <p className={`text-sm text-start ps-5 font-roobert`}>Description</p>
                </div>
                <div className='col-span-2'>
                    <p className={`text-sm  w-full font-roobert`}>Total</p>
                </div>
                <div className='col-span-1'>
                    <p className={`text-sm w-full font-roobert`}>Part</p>
                </div>
                <div className='col-span-1'>
                    <p></p>
                </div>
            </div>
            <div className='overflow-y-auto h-[75%]'>

                <div className='grid grid-cols-12 gap-2 hover:bg-gray-100'>
                    <div className='col-span-8'>
                        <p className='ps-5 text-sm text-gray-600 p-3 text-wrap'>{InstallCardProps.Description}</p>
                    </div>
                    <div className='col-span-2 text-gray-600 flex items-center justify-center'>
                        <p>{InstallCardProps.Price}</p>
                    </div>
                    <div className='col-span-1 text-gray-600 flex items-center justify-center'>
                        <p>{InstallCardProps.RemainingPart}</p>
                    </div>
                    <div className='col-span-1 text-gray-600 flex items-center justify-center'>
                        <Link className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm' to={`/${InstallCardProps.DetailUrl}`}>↗</Link>
                    </div>
                </div>

            </div>



        </div>

    )
}

export default InstallmentPaymentsCard
