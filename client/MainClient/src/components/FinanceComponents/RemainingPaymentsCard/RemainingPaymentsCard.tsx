import DynamicTable from '../../DynamicTable/DynamicTable'


const InstallCardProps = [
    { "description": "Deneme", "Price": 123, "To": "Berk", "": <button className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm'>$</button> },
    { "description": "Deneme", "Price": 251, "To": "Berk", "": <button className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm'>$</button> },
    { "description": "Deneme", "Price": 547, "To": "Berk", "": <button className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm'>$</button> },
]


function TodaysPaymentsCard() {
    return (
        <div className='w-full h-full'>
            <DynamicTable textScheme='text-orange-400' colorScheme='bg-orange-400' data={InstallCardProps} title='Installments' />
        </div>

    )
}

export default TodaysPaymentsCard
