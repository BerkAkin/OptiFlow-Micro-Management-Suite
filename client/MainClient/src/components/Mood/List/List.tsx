import { useState } from 'react';
import { Spinner, ErrorMessage, DynamicTable } from '../../Common';
import { UseListMood } from '../../../hooks';


export function List() {


    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const { data, isLoading, error } = UseListMood(filters, page);
    if (isLoading) return <Spinner />
    if (error || !data) return <ErrorMessage />

    const onPrev = () => {
        if (page > 1) setPage(page - 1)
    }

    const onNext = () => {
        if (!data) return
        if (page < data.maxPage) setPage(page + 1)
    }

    const handleFilter = (values: any) => {
        setPage(1)
        setFilters(values)
    }

    return (
        <div className='h-full '>
            <DynamicTable onPrev={onPrev} onNext={onNext} handleFilter={handleFilter} filterFields={data.filterFields} data={data.values} title='Moods' />
        </div>
    )
}

