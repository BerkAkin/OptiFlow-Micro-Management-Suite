import DynamicTable from '../../DynamicTable/DynamicTable'


interface filterValues {
    status: string,
    date: string,
    description: string
}


function MySuggestions() {


    const tempData: any = [
        { "header": "Deneme Header", "description": "Denemeler", "votes": "10", "status": "approved", "date": "2025-02-12" },
    ]
    const filterFields = [
        { name: "status", type: "select" as const, options: [{ value: "approved", label: "Approved" }, { value: "rejected", label: "Rejected" }] },
        { name: "description", type: "text" as const, placeholder: "Temp Description", },
        { name: "date", type: "date" as const, },
    ]
    const handleFilter = (values: filterValues) => {
        console.log(values);
    }
    return (
        <div className='border w-full h-[500px] bg-white rounded-lg shadow-custom border'>
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-indigo-400' colorScheme='bg-indigo-400' data={tempData} title='My Suggestions' />
        </div>
    )
}

export default MySuggestions
