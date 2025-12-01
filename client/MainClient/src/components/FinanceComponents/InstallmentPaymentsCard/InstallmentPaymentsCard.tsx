import { useInstallments } from '../../../hooks/FinanceHooks/useFinance';
import DynamicTable from '../../DynamicTable/DynamicTable'
import { useState } from 'react'




function InstallmentPaymentsCard() {

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({})

    const handleFilter = (values: any) => {
        setPage(1)
        setFilters(values)
    }

    const onPrev = () => {
        if (page > 1) setPage(page - 1)
    }

    const onNext = () => {
        if (!data) return
        if (page < data.maxPage) setPage(page + 1)
    }

    const { error, isLoading, data } = useInstallments(filters, page);

    if (error || !data) return (<p>Error...</p>)
    if (isLoading) return (<p>Loading...</p>)
    return (
        <div className='w-full h-full'>
            <DynamicTable onPrev={onPrev} onNext={onNext} handleFilter={handleFilter} filterFields={data.filterFields} textScheme='text-orange-400' colorScheme='bg-orange-400' data={data.values} title='Installments' />
        </div>

    )
}

export default InstallmentPaymentsCard
