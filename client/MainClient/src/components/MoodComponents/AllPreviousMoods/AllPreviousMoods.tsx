import { useState } from 'react';
import { UseAllPreviousMoods } from '../../../hooks/MoodHooks/UseMood'
import DynamicTable from '../../DynamicTable/DynamicTable'
import Spinner from '../../Spinner/Spinner';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

function AllPreviousMoods() {


    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});
    const { data, isLoading, error } = UseAllPreviousMoods(filters, page);
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

export default AllPreviousMoods
