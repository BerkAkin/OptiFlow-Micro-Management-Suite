import { useInstallment } from '../../../hooks/FinanceHooks/useFinance';
import DynamicTable from '../../DynamicTable/DynamicTable'
import { useState } from 'react'
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';




function InstallmentPayments() {

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({})


    const { error, isLoading, data, isFetching, refetch } = useInstallment(filters, page);
    if (error || !data) return (<ErrorMessage />)
    if (isLoading) return (<Spinner />)

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





    return (
        <div className='w-full h-full'>
            <DynamicTable isRefreshing={isFetching} onRefresh={() => refetch({ cancelRefetch: false })} onPrev={onPrev} onNext={onNext} handleFilter={handleFilter} filterFields={data.filterFields} data={data.values} title='Installments' />
        </div>

    )
}

export default InstallmentPayments
