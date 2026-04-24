import { useState } from 'react';
import { useMyDayOffs, useRequestDayOff } from '../../../hooks/SupportHooks/UseSupport'
import DynamicForm from '../../DynamicForm/DynamicForm'
import DynamicTable from '../../DynamicTable/DynamicTable'
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Spinner from '../../Spinner/Spinner';


function MyDayOffs() {
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({});

    const mutation = useRequestDayOff();
    const { isLoading, error, data } = useMyDayOffs(filters, page);

    if (isLoading) return <div className="h-[500px] flex items-center justify-center"><Spinner /></div>;
    if (error || !data) return <div className="h-[500px] flex items-center justify-center"><ErrorMessage /></div>;

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
        days: 1,
        startingDate: new Date().toISOString().split("T")[0]
    }

    const inputFields = [
        { name: "topic", id: "topic", type: "text" as const, label: "Topic", placeholder: "Reason for leave..." },
        { name: "startingDate", id: "startingDate", type: "date" as const, label: "Start Date", placeholder: "" },
        { name: "days", id: "days", type: "number" as const, label: "Number of Days", placeholder: "" },
        { name: "description", as: "textarea" as const, id: "description", type: "text" as const, label: "Description", placeholder: "Additional notes..." },
    ]

    const handleFilterUpdate = (values: any) => {
        setPage(1);
        setFilters(values);
    };

    return (
        <div className='flex gap-6 w-full min-h-[550px] grid grid-cols-12'>

            <div className="col-span-8">
                <DynamicTable
                    onNext={nextPage}
                    onPrev={previousPage}
                    filterFields={data.filterFields}
                    handleFilter={handleFilterUpdate}
                    data={data.data}
                    title='My Leave Requests'
                />
            </div>

            <div className='flex-1 flex flex-col gap-4 col-span-4'>
                <div className='bg-white border border-gray-200 rounded-xl shadow-custom p-2 flex flex-col'>
                    <div className="px-4 pt-4 pb-2">
                        <h3 className="text-lg font-rubik font-bold text-slate-800 tracking-tight">New Request</h3>
                        <p className="text-sm text-slate-500">Fill out the form to submit your leave for approval.</p>
                    </div>

                    <div className="flex-1">
                        <DynamicForm
                            colorScheme='bg-blue-600'
                            hoverScheme='hover:bg-blue-700'
                            fields={inputFields}
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            title=''
                        />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MyDayOffs;