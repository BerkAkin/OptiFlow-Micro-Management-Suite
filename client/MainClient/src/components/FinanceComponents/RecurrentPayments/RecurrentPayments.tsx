import { useState } from 'react'
import DynamicTable from '../../DynamicTable/DynamicTable'
import { useRecurrent } from '../../../hooks/FinanceHooks/useFinance';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';



function RecurrentPayments() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({})

    const { isLoading, error, data, isFetching, refetch } = useRecurrent(filters, page);
    if (error || !data) return (<ErrorMessage />)
    if (isLoading) return (<Spinner />)

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



    return (
        <div className='w-full h-full'>
            <DynamicTable onNext={onNext} isRefreshing={isFetching} onRefresh={() => refetch({ cancelRefetch: false })} onPrev={onPrev} handleFilter={handleFilter} filterFields={data.filterFields} data={data.values} title='Recurrent Payments' />
        </div>

    )
}

export default RecurrentPayments
