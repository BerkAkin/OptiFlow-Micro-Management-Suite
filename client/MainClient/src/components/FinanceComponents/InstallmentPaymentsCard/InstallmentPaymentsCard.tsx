import { Link } from 'react-router'
import DynamicTable from '../../DynamicTable/DynamicTable'
import external from '../../../assets/external.svg'


interface FilterTypes {
    description: string
}

const InstallCardProps = [
    { "description": "Deneme", "Price": 12, "Parts": "2/4", "": <Link className='cursor-pointer' to={`Deneme`}><img className='ms-5' src={external} width={25} alt="" /></Link> },
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
