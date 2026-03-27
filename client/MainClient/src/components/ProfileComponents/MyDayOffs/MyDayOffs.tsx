import { useRequestDayOff } from '../../../hooks/SupportHooks/UseSupport'
import DynamicForm from '../../DynamicForm/DynamicForm'
import DynamicTable from '../../DynamicTable/DynamicTable'

interface filterValues {
    date: string,
    description: string
}


function MyDayOffs() {

    const mutation = useRequestDayOff();
    const handleSubmit = (payload: any) => {
        mutation.mutate({ payload: payload });
    }

    const initialValues = {
        topic: "",
        description: "",
        days: 10,
        startingDate: new Date().toISOString().split("T")[0]
    }

    const fields = [
        { name: "topic", id: "topic", type: "text" as const, label: "Topic", placeholder: "Topic..." },
        { name: "description", as: "textarea" as const, id: "description", type: "text" as const, label: "Description", placeholder: "Description..." },
        { name: "startingDate", id: "startingDate", type: "date" as const, label: "Date", placeholder: "" },
        { name: "days", id: "days", type: "number" as const, label: "Days", placeholder: "" },
    ]

    const tempData: any = [
        { topic: "Deneme Leave", description: "Denemeler", days: "10", Date: "2025-02-12", status: "Ok", },
    ]


    const tempData2: any = [
        {
            topic: "Deneme İstek",
            description: "Deneme İsteklerden Birincisi",
            days: "10",
            Date: "2025.02.12",
            "": <div className='flex items-center justify-center gap-2'>
                <button type='button' onClick={() => alert(false)} className='transition-all hover:scale-[1.1] cursor-pointer ms-2 bg-red-500 rounded-full shadow-custom w-6 text-xs text-white'>✘</button>
                <button type='button' onClick={() => alert(true)} className='transition-all hover:scale-[1.1] cursor-pointer bg-green-500 rounded-full shadow-custom w-6 text-xs text-white mx-1 '>✔</button>
            </div>
        },
    ]

    const filterFields = [
        { name: "date", type: "date" as const, },
        { name: "description", type: "text" as const, placeholder: "Description..." },
    ]
    const handleFilter = (values: filterValues) => {
        console.log(values);
    }

    return (
        <div className='grid grid-cols-12 gap-6 w-full h-[500px]'>

            <div className='col-span-10 border border-gray-200 bg-white rounded-lg shadow-custom h-[500px] w-full'>
                <DynamicTable filterFields={filterFields} handleFilter={handleFilter} data={tempData} title='My Off Days' />
            </div>
            <div className='col-span-2 border border-gray-200 bg-white rounded-lg shadow-custom h-[340px] '>
                <DynamicForm colorScheme='bg-sky-400' hoverScheme='hover:bg-sky-500' fields={fields} initialValues={initialValues} onSubmit={handleSubmit} title='Take A Day Off' />
            </div>
        </div >
    )
}

export default MyDayOffs
