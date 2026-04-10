import { useState } from 'react';
import { useMyDayOffs, useRequestDayOff } from '../../../hooks/SupportHooks/UseSupport'
import DynamicForm from '../../DynamicForm/DynamicForm'
import DynamicTable from '../../DynamicTable/DynamicTable'
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Spinner from '../../Spinner/Spinner';

interface filterValues {
    date: string,
    description: string
}


function MyDayOffs() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});

    const mutation = useRequestDayOff();
    const { isLoading, error, data } = useMyDayOffs(filters, page);
    if (isLoading) return <Spinner />;
    if (error || !data) return <ErrorMessage />;


    const previousPage = () => {
        if (page > 1) setPage(page - 1);
    }
    const nextPage = () => {
        if (!data) return;
        if (page < data.maxPage) setPage(page + 1)
    }


    const handleSubmit = (payload: any) => {
        mutation.mutate({ payload: payload });
    }

    const initialValues = {
        topic: "",
        description: "",
        days: 10,
        startingDate: new Date().toISOString().split("T")[0]
    }

    const inputFields = [
        { name: "topic", id: "topic", type: "text" as const, label: "Topic", placeholder: "Topic..." },
        { name: "description", as: "textarea" as const, id: "description", type: "text" as const, label: "Description", placeholder: "Description..." },
        { name: "startingDate", id: "startingDate", type: "date" as const, label: "Date", placeholder: "" },
        { name: "days", id: "days", type: "number" as const, label: "Days", placeholder: "" },
    ]

    const filterFunction = (values: any) => {
        setPage(1);
        setFilters(values);
    };
    return (
        <div className='grid grid-cols-12 gap-6 w-full h-[500px]'>

            <div className='col-span-10 border border-gray-200 bg-white rounded-lg shadow-custom h-[500px] w-full'>
                <DynamicTable onNext={nextPage} onPrev={previousPage} filterFields={data.filterFields} handleFilter={filterFunction} data={data.data} title='My Off Days' />
            </div>
            <div className='col-span-2 border border-gray-200 bg-white rounded-lg shadow-custom h-[340px] '>
                <DynamicForm colorScheme='bg-sky-400' hoverScheme='hover:bg-sky-500' fields={inputFields} initialValues={initialValues} onSubmit={handleSubmit} title='Take A Day Off' />
            </div>
        </div >
    )
}

export default MyDayOffs
