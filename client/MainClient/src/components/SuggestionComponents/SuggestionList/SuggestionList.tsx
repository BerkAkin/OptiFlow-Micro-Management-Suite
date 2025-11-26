import DynamicTable from '../../DynamicTable/DynamicTable';


interface filterValues {
    status: string,
    date: string,
    description: string
}


function SuggestionList() {


    const handleFilter = (values: filterValues) => {
        console.log(values)
    }
    const tempData: any = [
        { "header": "Deneme Header", "description": "Denemeler", "votes": "10", "status": "approved", "date": "2025-02-12" },
    ]
    const filterFields = [
        { name: "status", type: "select" as const, options: [{ value: "approved", label: "Approved" }, { value: "rejected", label: "Rejected" }] },
        { name: "description", type: "text" as const, placeholder: "Description...", },
        { name: "date", type: "date" as const, },
    ]

    return (

        <div className='h-[675px] bg-white rounded-lg shadow-custom border border-gray-200'>
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-indigo-400' colorScheme='bg-indigo-400' data={tempData} title='Suggestions' />
        </div>
    )

}

export default SuggestionList
