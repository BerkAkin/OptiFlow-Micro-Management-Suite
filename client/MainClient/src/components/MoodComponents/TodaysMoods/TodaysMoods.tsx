import DynamicTable from '../../DynamicTable/DynamicTable'

interface filterTypes {
    mood: string,
    date: string
}

function TodaysMoods() {



    const tempData = [
        { "employee": "Berk Akın", "mood": "Happy", "tags": "Work, Food, Weather", "date": "30.11.2025" },
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
            <DynamicTable handleFilter={handleFilter} filterFields={filterFields} textScheme='text-rose-400' colorScheme='bg-rose-400' data={tempData} title='Todays Moods' />
        </div>
    )
}

export default TodaysMoods
