import DynamicTable from '../../DynamicTable/DynamicTable'

interface FilterTypes {
    description: string
}

const InstallCardProps = [
    { "description": "Deneme", "Price": 123, "To": "Berk", "": <button className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm'>$</button> },
]

const handleFilter = (values: FilterTypes) => {
    console.log(values)
}

const filterFields = [
    { name: "description", placeholder: "Temp Description", type: "text" as const },
    { name: "to", placeholder: "To", type: "text" as const },
]

function TodaysPaymentsCard() {
    return (
        <div className='w-full h-full'>
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-orange-400' colorScheme='bg-orange-400' data={InstallCardProps} title='Installments' />
        </div>

    )
}

export default TodaysPaymentsCard
