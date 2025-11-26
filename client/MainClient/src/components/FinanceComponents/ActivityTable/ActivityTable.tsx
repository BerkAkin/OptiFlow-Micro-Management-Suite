import DynamicTable from '../../DynamicTable/DynamicTable';


interface filterValues {
    date: string,
    type: string
}



function ActivityTable() {

    const tempData: any = [
        { "type": "+", "name": "Happy", "description": "Denemeler", "By": "Work", "Date": "2025-02-12", "Exchange": "$", "quantity": "3", "price": "5000", "invoice": "" },
    ]
    const filterFields = [
        { name: "date", type: "date" as const, placeholder: "", },
        { name: "type", type: "select" as const, placeholder: "", options: [{ label: "Income", value: "Income" }, { label: "Expense", value: "Expense" }] },
    ]
    const filterFunction = (values: filterValues) => {
        console.log(values);
    }
    return (

        <div className='h-full'>
            <DynamicTable textScheme='text-sky-400' colorScheme='bg-sky-400' data={tempData} title='Latest Activity' handleFilter={filterFunction} filterFields={filterFields} />
        </div>
    )
}

export default ActivityTable
