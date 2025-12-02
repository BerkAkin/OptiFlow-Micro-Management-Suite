import DynamicTable from '../../DynamicTable/DynamicTable'

interface RatingTableData {
    Employee: string,
    Points: string,
    Votes: string,
}

function RatingTable() {

    const tempData: RatingTableData[] = [{ Employee: "Berk Akın", Points: "4.8", Votes: "278" }]
    const filterFields = [{ name: "employee", id: "employee", type: "select" as const, options: [{ value: "berkakin", label: "Berk Akın" }] }]

    const handleFilter = (values: any) => {
        console.log(values)
    }

    return (
        <div className='h-full bg-white rounded-lg shadow-custom'>
            <DynamicTable colorScheme='bg-red-400' textScheme='text-red-400' data={tempData} title='Employee Ratings' filterFields={filterFields} handleFilter={handleFilter} />
        </div>
    )
}

export default RatingTable
