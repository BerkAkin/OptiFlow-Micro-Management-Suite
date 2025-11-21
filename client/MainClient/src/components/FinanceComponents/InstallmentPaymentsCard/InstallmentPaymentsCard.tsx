import React from 'react'
import { Link } from 'react-router-dom'
import DynamicTable from '../../DynamicTable/DynamicTable'




const InstallCardProps = [
    { "description": "Deneme", "Price": 12, "Parts": "2/4", "": <Link className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm' to={`Deneme`}>↗</Link> },
    { "description": "Deneme", "Price": 12, "Parts": "2/4", "": <Link className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm' to={`Deneme`}>↗</Link> },
    { "description": "Deneme", "Price": 12, "Parts": "2/4", "": <Link className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm' to={`Deneme`}>↗</Link> },
]

function InstallmentPaymentsCard() {
    return (
        <div className='w-full h-full'>
            <DynamicTable textScheme='text-orange-400' colorScheme='bg-orange-400' data={InstallCardProps} title='Installments' />
        </div>

    )
}

export default InstallmentPaymentsCard
