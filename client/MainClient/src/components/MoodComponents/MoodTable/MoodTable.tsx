import DynamicTable from '../../DynamicTable/DynamicTable'

interface filterTypes {
    mood: string,
    date: string
}

function MoodTable() {


    const tempData: any = [
        { "mood": "Happy", "tags": "Work, Friends, Food, Weather", "date": "25.12.2025", },
    ]
    const handleFilter = (values: filterTypes) => {
        console.log(values)
    }
    const filterFields = [
        {
            name: "mood",
            type: "select" as const,
            options: [
                { label: "Very Sad", value: "verySad" },
                { label: "Sad", value: "sad" },
                { label: "Neutral", value: "neutral" },
                { label: "Happy", value: "happy" },
                { label: "Very Happy", value: "veryHappy" },
            ]
        },
        { name: "date", type: "date" as const }
    ]


    return (
        <div className=' w-full h-full '>
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-rose-400' colorScheme='bg-rose-400' data={tempData} title='Previous Moods' />
        </div>
    )
}

export default MoodTable
