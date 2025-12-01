import { useState } from 'react'
import DynamicTable from '../../DynamicTable/DynamicTable'
import { useRemainings } from '../../../hooks/FinanceHooks/useFinance';



function RemainingPayments() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({})

    const onNext = () => {
        if (!data) return
        if (page < data.maxPage) setPage(page + 1)
    }
    const onPrev = () => {
        if (page > 1) setPage(page - 1)
    }
    const handleFilter = (values: any) => {
        setPage(1)
        setFilters(values)
    }

    const { isLoading, error, data } = useRemainings(filters, page);
    if (error || !data) return (<p>Error...</p>)
    if (isLoading) return (<p>Loading...</p>)

    return (
        <div className='w-full h-full'>
            <DynamicTable onNext={onNext} onPrev={onPrev} handleFilter={handleFilter} filterFields={data.filterFields} textScheme='text-orange-400' colorScheme='bg-orange-400' data={data.values} title='Remainings' />
        </div>

    )
}

export default RemainingPayments
