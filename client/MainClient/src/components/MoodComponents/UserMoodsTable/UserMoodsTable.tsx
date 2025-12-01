import DynamicTable from '../../DynamicTable/DynamicTable'

const handleFilter = (values: any) => {
    console.log(values)
}
const filterFields = [
    {
        name: "mood", id: "mood", placeholder: "", type: "select" as const,
        options: [
            { label: "Happy", value: "happy" },
            { label: "Sad", value: "sad" },
            { label: "Very Sad", value: "verySad" },
            { label: "Very Happy", value: "veryHappy" },
            { label: "Neutral", value: "neutral" },
        ]
    },
]

const tempData = [
    { "user": "Berk Akın", "mood": "Happy", "tags": "Work, Food, Weather", "date": "30.11.2025" },
]

function UserMoodsTable() {
    return (
        <div className=' w-full h-full '>
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-rose-400' colorScheme='bg-rose-400' data={tempData} title='Todays Moods' />
        </div>
    )
}

export default UserMoodsTable
