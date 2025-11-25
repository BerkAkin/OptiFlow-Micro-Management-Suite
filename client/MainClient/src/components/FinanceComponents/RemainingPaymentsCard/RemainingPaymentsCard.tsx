import DynamicTable from '../../DynamicTable/DynamicTable'
import dollar from '../../../assets/dollar.svg'

interface FilterTypes {
    description: string
}

const InstallCardProps = [
    { "description": "Deneme", "Price": 123, "To": "Berk", "": <button className='text-white  px-2 me-1 cursor-pointer  rounded-sm'><img src={dollar} width={25} alt="" /></button> },
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
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-orange-400' colorScheme='bg-orange-400' data={InstallCardProps} title='Remainings' />
        </div>

    )
}

export default TodaysPaymentsCard
