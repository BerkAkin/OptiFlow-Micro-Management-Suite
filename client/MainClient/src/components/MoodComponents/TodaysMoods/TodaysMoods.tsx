import { useState } from 'react';
import { useTodaysMoods } from '../../../hooks/MoodHooks/UseMood'
import DynamicTable from '../../DynamicTable/DynamicTable'

function TodaysMoods() {

    const userId = 1

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});


    const { data, isLoading, error } = useTodaysMoods(filters, page, userId);

    if (isLoading) return (<p>Loading...</p>)
    if (error || !data) return (<p>Error...</p>)


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
        <div className=' w-full h-full '>
            <DynamicTable onPrev={onPrev} onNext={onNext} handleFilter={handleFilter} filterFields={data.filterFields} textScheme='text-rose-400' colorScheme='bg-rose-400' data={data.values} title='Todays Moods' />
        </div>
    )
}

export default TodaysMoods
