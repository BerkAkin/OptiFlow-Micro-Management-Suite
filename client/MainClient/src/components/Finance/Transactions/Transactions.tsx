import { useState } from 'react';
import { DynamicTable, Spinner, ErrorMessage } from '../../Common';
import { useTransactions } from '../../../hooks';


export function Transactions() {
    const [filters, setFilters] = useState({});
    const [page, setPage] = useState(1);

    const { isLoading, error, data, refetch, isFetching } = useTransactions(filters, page);
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

        <div className='h-[630px]'>
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

