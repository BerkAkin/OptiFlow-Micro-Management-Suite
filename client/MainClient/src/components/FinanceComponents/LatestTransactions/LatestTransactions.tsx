import { useState } from 'react';
import { useLatestActivity } from '../../../hooks/FinanceHooks/useFinance';
import DynamicTable from '../../DynamicTable/DynamicTable';
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';



function LatestTransactions() {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);

    const { isLoading, error, data, refetch, isFetching } = useLatestActivity(filters, page);
    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)

    const filterFunction = (values: any) => {
        setPage(1);
        setFilters(values);
    };

    const nextPage = () => {
        if (!data) return;
        if (page < data.maxPage) setPage(page + 1)
    }
    const prevPage = () => {
        if (page > 1) setPage(page - 1);
    }

    return (

        <div className='h-full'>
            <DynamicTable
                onRefresh={() => refetch({ cancelRefetch: false, throwOnError: true })}
                isRefreshing={isFetching}
                onNext={nextPage}
                onPrev={prevPage}
                data={data.values}
                title='Transaction History'
                handleFilter={filterFunction}
                filterFields={data.filterFields} />
        </div>
    )
}

export default LatestTransactions
