import { useState } from 'react';
import { useEmployeeList } from '../../../hooks/EmployeeHooks/useEmployee'
import DynamicTable from '../../DynamicTable/DynamicTable'
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Spinner from '../../Spinner/Spinner';
import { Outlet } from 'react-router';

function EmployeeList() {

    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({})

    const { error, isLoading, data, isFetching, refetch } = useEmployeeList(filters, page);
    if (isLoading) return (<Spinner />)
    if (error || !data) return (<ErrorMessage />)

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
        <div className='w-full h-full grid grid-cols-12 gap-4'>
            <div className='col-span-12 h-[480px] w-full'>
                <DynamicTable EditorParam='email' isEditable={true} isRefreshing={isFetching} onRefresh={() => refetch({ cancelRefetch: false })} onPrev={onPrev} onNext={onNext} handleFilter={handleFilter} filterFields={data.filterFields} data={data.values} title='Tiders List' />
            </div>
            <div className='col-span-12 h-[250px] w-full'>
                <Outlet />
            </div>
        </div>

    )
}

export default EmployeeList
