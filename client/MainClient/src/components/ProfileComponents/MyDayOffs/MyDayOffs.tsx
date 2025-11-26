import DynamicForm from '../../DynamicForm/DynamicForm'
import DynamicTable from '../../DynamicTable/DynamicTable'

interface filterValues {
    date: string,
    description: string
}


function MyDayOffs() {

    const handleSubmit = (values: any) => {
        console.log(values)
    }

    const initialValues = {
        topic: "",
        description: "",
        days: 10,
        datesBetween: new Date().toISOString().split("T")[0]
    }

    const fields = [
        { name: "datesBetween", id: "datesBetween", type: "date" as const, label: "Date", placeholder: "" },
        { name: "days", id: "days", type: "number" as const, label: "Days", placeholder: "" },
        { name: "description", as: "textarea" as const, id: "description", type: "text" as const, label: "Description", placeholder: "Description..." },
        { name: "topic", id: "topic", type: "text" as const, label: "Topic", placeholder: "Topic..." },
    ]

    const tempData: any = [
        { "topic": "Deneme Leave", "description": "Denemeler", "days": "10", "Date": "2025-02-12" },
    ]

    const filterFields = [
        { name: "date", type: "date" as const, },
        { name: "description", type: "text" as const, placeholder: "Description..." },
    ]
    const handleFilter = (values: filterValues) => {
        console.log(values);
    }

    return (
        <div className='grid grid-cols-9 gap-6 w-full h-[500px]'>

            <div className='col-span-7 border border-gray-200 bg-white rounded-lg shadow-custom h-[500px] w-full'>
                <DynamicTable filterFields={filterFields} handleFilter={handleFilter} textScheme='text-sky-400' colorScheme='bg-sky-400' data={tempData} title='My Leavings' />
            </div>
            <div className='col-span-2 border border-gray-200 bg-white rounded-lg shadow-custom h-[400px] '>
                <DynamicForm colorScheme='bg-sky-400' hoverScheme='hover:bg-sky-500' fields={fields} initialValues={initialValues} onSubmit={handleSubmit} title='Take A Day Off' />
            </div>


        </div >
    )
}

export default MyDayOffs
