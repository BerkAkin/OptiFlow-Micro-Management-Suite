import { Link } from 'react-router-dom'
import DynamicTable from '../../DynamicTable/DynamicTable'


interface FilterTypes {
    description: string
}

const InstallCardProps = [
    { "description": "Deneme", "Price": 12, "Parts": "2/4", "": <Link className='bg-gray-400 text-white p-1 px-2 me-1 cursor-pointer hover:bg-gray-500 rounded-sm' to={`Deneme`}>↗</Link> },
]

const handleFilter = (values: FilterTypes) => {
    console.log(values)
}

const filterFields = [
    { name: "description", placeholder: "Temp Description", type: "text" as const }
]

function InstallmentPaymentsCard() {
    return (
        <div className='w-full h-full'>
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-orange-400' colorScheme='bg-orange-400' data={InstallCardProps} title='Installments' />
        </div>

    )
}

export default InstallmentPaymentsCard
